'use client'
import { useEffect, useState } from "react"
import AttrCard from "./clickCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/supabaseClient";

async function fetchAttrById(pid, rid){
    const { data, error } = await supabase
        .from('places')
        .select()
        .eq('pid', pid)
        .eq('rid', rid);

    if (data && data.length > 0) {
        return data;
    }
    if (error) {
        return -1;
    }
}

async function fetchSchedule(id){
    const { data, error } = await supabase
        .from('user_info')
        .select('schedule')
        .eq('id', id);

    if (data && data.length > 0) {
        return schedule;
    }
    if (error) {
        return -1;
    }
}

async function updateSchedule(id, localSchedule) {
    const { err } = await supabase
        .from('user_info')
        .upsert({ schedule: localSchedule })
        .eq('id', id);
    if (err.status !== 204) {
        return err;
    }else{
        return -1;
    }
}

export default function AttrList( {cardData} ){
    const [showDate, setShowDate] = useState(false);
    const [ridSelected, setRidSelected] = useState(-1);
    const [pidSelected, setPidSelected] = useState(-1);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(showDate){
            document.body.classList.add("overflow-y-hidden");
        }else{
            document.body.classList.remove("overflow-y-hidden");
        }
    })

    const handlePick = (e, pid, rid) => {
        e.stopPropagation();
        if(status !== "authenticated"){
            router.replace("/login");
            return;
        }
        setShowDate(true);
        setPidSelected(pid);
        setRidSelected(rid);
    }

    const handleDateSelect = () => {

    }

    const handleUnPick = () => {
        setShowDate(false);
        setPidSelected(-1);
        setRidSelected(-1);
    }

    const handleSubmit = async (CalDate) => {
        const attr = await fetchAttrById(pidSelected, ridSelected);
        if (attr === -1) {
            alert("Error adding schedule, please try again.\nThis error has been reported.");
            return;
        }
        var dateDetails = {
            "CalDate": CalDate,
            "content": {
                "eid": attr.attraction,
                "pid": attr.city,
            }
        }
        var remoteSchedule = await fetchSchedule(session.user.id);
        const localSchedule = remoteSchedule.push(dateDetails);
        const err = await updateSchedule(session.user.id, localSchedule);
        if(err === -1){
            alert("Error adding schedule, please try again.");
        }
        ;
    }

    const handleDes = (pid, rid) => {
        router.push(`/catalogue/${rid}/${pid}`);
    }

    return (
        <div>        
            <div className="h-full columns-2 gap-0 p-5 mx-5">
                {cardData.map((item, i) => <AttrCard idx={i} item={item} desFunc={handleDes} dateFunc={handlePick}/>)}
            </div>
            {showDate? <DateSelect submitFunc={handleSubmit} quitFunc={handleUnPick} /> : null}
        </div>
    )
}

 function DateSelect( { submitFunc, quitFunc } ){
    return (
        <div className="fixed h-[100%] w-[100%] backdrop-blur bg-slate-800 z-50 top-0 bg-opacity-50">
            <div className="flex flex-col gap-4 justify-center items-center">

            </div>
            <div className="flex max-w-screen maxh-h-screen justify-center items-center gap-4">
                <button onClick={()=>submitFunc()} className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Select</button>
                <button onClick={()=>quitFunc()} className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Cancel</button>
            </div>
        </div>
    )
}