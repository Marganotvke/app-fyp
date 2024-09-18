'use client'
import { useState, useEffect } from "react";
import ScheduleCard from "./scheduleCard";
import ScheduleComment from "./scheduleCom";
import ScheduleButton from "./scheduleButton";
import { getSession } from "next-auth/react";

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

    const handleDelete = () => {
        delete schedule[cid];
        schedule = schedule.filter((item) => item !== null);
        localSchedule = schedule;
        window.localStorage.setItem("tmpSchedule", JSON.stringify(localSchedule));
        setCID(-1);
        console.log(JSON.stringify(schedule))
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
            <div className="flex max-w-screen h-screen items-center justify-center">
                <svg className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
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
        <button onClick={()=>handleClick()} className="flex border rounded-lg p-2 mx-2 hover:bg-slate-400 hover:text-slate-800">Confirm Schedule</button>
    </> 
}