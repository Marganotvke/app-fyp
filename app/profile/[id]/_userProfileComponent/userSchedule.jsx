'use client'
import { useState } from "react";
import ScheduleCard from "./scheduleCard";
import ScheduleComment from "./scheduleCom";

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

export default function UserSchedule( { schedules } ){
    const [cid, setCID] = useState(-1);
    const [targetYear, setTargetYear] = useState(2023);
    const [startYear, endYear] = [2015, 2030];
    const handleCID = (id) => {
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


    if (!schedules || schedules.length == 0){
        return <>
            <h1 className="text-3xl font-light p-5">You currently do not have any schedule</h1>
        </>
    }

    const schedule = schedules[0].schedule;
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
        <div className="flex mx-[5vh] p-3 max-w-full items-center justify-center">
            {schedule.map((item, idx) => <ScheduleComment idx={idx} cid={cid} content={item.content}/>)}
        </div>
        <button className="flex border rounded-lg p-2 mx-2 hover:bg-slate-400 hover:text-slate-800">Confirm Schedule</button>
    </>
}