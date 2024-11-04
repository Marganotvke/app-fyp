'use client'
import { useState, useEffect } from "react";
import ScheduleCard from "./scheduleCard";
import ScheduleComment from "./scheduleCom";
import ScheduleButton from "./scheduleButton";
import { getSession } from "next-auth/react";
import LoadThrobber from "@/app/_mainStyleComponent/loadThrobber";
import { supabase } from "@/supabaseClient";

async function updateUserInfo(session, schedule){
    const id = session.user.id;
    const err = await supabase
        .from("user_info")
        .update({schedule: schedule})
        .eq("id", id)

    if(err.status !== 204){
        return err;
    }else{
        return -1;
    }
}

function ts2YMD(ts){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
    const tsDate = new Date(ts);
    const year = tsDate.getFullYear();
    const month = monthNames[tsDate.getMonth()];
    const date = tsDate.getDate();
    return [year, month, date];
}

function cardFromScheduleItem(targetYear, item, idx, cid, func){
    const ts = parseInt(item.CalDate);
    const [year, month, date] = ts2YMD(ts*1000);
    if (year != targetYear) return null;
    return <ScheduleCard id={idx} month={month} date={date} cid={cid} handleCID={func}/>
}

export default function UserSchedule( { schedules, handleClick } ){
    let localSchedule, schedule = schedules[0].schedule;

    const [loaded, setLoaded] = useState(false);
    const { data: session } = getSession();
    const [cid, setCID] = useState(-1);
    const curYear = new Date().getFullYear();
    const [targetYear, setTargetYear] = useState(2023);
    const [startYear, endYear] = [2020, 2030];
    const handleCID = (id) => {
        if (id === cid){
            setCID(-1);
            return;
        }
        setCID(id);
    }

    const backYear = () => {
        const destYear = targetYear-1;
        if (destYear < startYear) return;
        setTargetYear(destYear);
        setCID(-1);
    }

    const forwardYear = () => {
        const destYear = targetYear+1;
        if (destYear > endYear) return;
        setTargetYear(targetYear+1);
        setCID(-1);
    }

    const handleDelete = async () => {
        delete schedule[cid];
        schedule = schedule.filter((item) => item !== null);
        localSchedule = schedule;
        window.localStorage.setItem("tmpSchedule", JSON.stringify(localSchedule));
        setCID(-1);
        console.log(JSON.stringify(schedule))
        const res = await updateUserInfo(session, localSchedule);
        if (res !== -1){
            alert(`Error updating schedule, please try again.\n${res}`);
        }
    }

    if (!schedule || schedule.length == 0){
        return <>
            <h1 className="text-3xl font-light p-5">You currently do not have any schedule!</h1>
        </>
    }

    useEffect(() => {
        localSchedule = JSON.parse(window.localStorage.getItem("tmpSchedule"));
        if(!localSchedule || localSchedule.length == 0){
            localSchedule = schedule;
            window.localStorage.setItem("tmpSchedule", JSON.stringify(localSchedule));
        }else{
            schedule = localSchedule;
        }
        setLoaded(true);
    },[]);

    if (!loaded) {
        return (
            <LoadThrobber />
        )
    }

    return <>
        <h1 className="text-3xl font-light p-5">Your current schedule:</h1>
        <div className="flex items-center justify-center">
            {targetYear === startYear? null: <button onClick={backYear} className="p-5 text-3xl font-light">{"<"}</button>}
            <h1 className="px-5 py-2 border rounded-lg text-2xl">{targetYear}</h1>
            {targetYear === endYear? null: <button onClick={forwardYear} className="p-5 text-3xl font-light">{">"}</button>}
        </div>
        <div className="flex flex-wrap mx-[5vh] p-3 gap-5 flex-row max-w-full items-center justify-center">
            {schedule.map((item, idx) => cardFromScheduleItem(targetYear, item, idx, cid, handleCID))}
        </div>
        <div className="flex flex-col mx-[5vh] p-3 max-w-full items-center justify-center">
            {schedule.map((item, idx) => <ScheduleComment idx={idx} cid={cid} content={item.content} handleFunc={handleClick}/>)}
            {cid === -1? null: 
                <button onClick={()=>handleDelete()} className={"border rounded-lg p-2 m-2 hover:bg-slate-400 hover:text-slate-800"}>
                    Delete
                </button>
            }
        </div>
        <button onClick={()=>handleClick()} className="border rounded-lg p-2 mx-2 hover:bg-slate-400 hover:text-slate-800">Start Booking</button>
    </> 
}