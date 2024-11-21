'use client'

import { useRouter } from "next/navigation"
import StyledButtonPlain from "@/app/_mainStyleComponent/StyledButtons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { DatePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, today } from "@internationalized/date";
import { supabase } from "@/supabaseClient";

async function upsertSchedule(session, dates){
    if (!session) return -1;
    const id = session.user.id;

    const {data, error} = await supabase
        .from("user_info")
        .select("schedule")
        .eq("id", id)
    
    if (data){
        var tmpSchedule;
        if (data.length > 0 && data[0].schedule){
            tmpSchedule = [...data[0].schedule, dates];
        }else{
            tmpSchedule = [dates];
        }
        console.log(tmpSchedule);
        const res = await supabase
            .from("user_info")
            .upsert({id:id, schedule: tmpSchedule})
            .select()

        if(res.status !== 201 && res.status !== 200 && !res.error){  
            console.log(res);
            return -1;
        }
    }else{
        console.log(error);
        return -1;
    }
}

function DateSelect( { submitFunc, quitFunc, isInvalidDate, router } ){
    const [selectedDate, setSelectedDate] = useState(false);
    const [note, setNotes] = useState("");

    return (
        <div className="h-[100%] w-[100%] backdrop-blur bg-slate-800 z-50 top-0 fixed bg-opacity-50">
            <div className="flex flex-col max-w-screen max-h-screen justify-center items-center gap-4 p-4">
                <DatePicker label="Select Date" variant="flat" showMonthAndYearPickers
                className="dark" 
                dateInputClassNames={{inputWrapper:"bg-slate-700 hover:bg-slate-700", description: "text-gray-200"}}
                classNames={{calendarContent: 'bg-slate-700 dark', calendar:'dark bg-slate-700'}}
                onChange={setSelectedDate} isRequired isInvalid={isInvalidDate} errorMessage="Please enter a valid date."  description="You can select dates multiple times for the same destination."
                minValue={today(getLocalTimeZone())} maxValue={today(getLocalTimeZone()).add({years: 5})}/>
                <input className="w-full bg-slate-700 border rounded-md p-1" placeholder="Anything you want to remind yourself?" onChange={(e) => {setNotes(e.target.value)}}/>
                <div className="flex gap-4 justify-end w-full">
                    <button onClick={(e)=>submitFunc(e, selectedDate, note)} className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Add to schedule</button>
                    <button onClick={quitFunc} className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Back</button>
                </div>
            </div>
        </div>
    )
}

export default function AttrDes( {items} ){
    const {data: session, status} = useSession();
    const router = useRouter();
    const [showDate, setShowDate] = useState(false);
    const [isInvalidDate, setIsInvalidDate] = useState(false);

    if(!items){
        router.push("/404")
        return null;
    }

    const {pid, rid, city, attraction, description, image, brief} = items[0];
    const region = rid === 0 ? "Hong Kong" : "Taiwan";

    const handlePick = () => {
        if(status !== "authenticated"){
            router.push("/login");
            return null;
        }
        setShowDate(true);
    }

    const handleUnPick = () => {
        setShowDate(false);
    }

    const handleSubmit = async (e, date, note) => {
        e.preventDefault();
        if (!date) {
            setIsInvalidDate(true);
            return;
        }
        const pickedDate = new Date(`${date.year}-${date.month}-${date.day}`);
        if(pickedDate < new Date()){
            setIsInvalidDate(true);
            return;
        }
        const pickedDetail = {
            CalDate: pickedDate.getTime()/1000,
            content: {
                pid: city,
                eid: attraction,
                comment: note ? note : "N/A"
            }
        }
        const res = await upsertSchedule(session, pickedDetail);
        if(res === -1){
            alert("An error occured. Please try again later.");
            setIsInvalidDate(false);
            return;
        }
        alert("Date added to schedule")
        setIsInvalidDate(false);
    }

    return <>
        <div className="container max-w-full h-screen font-light">
            {image ? <img src={image} className="float-left m-2 w-[30%] rounded-xl"></img> : null}
            {showDate ? <DateSelect rid={rid} pid={pid} submitFunc={handleSubmit} quitFunc={handleUnPick} isInvalidDate={isInvalidDate} router={router} /> : null}
            <h1 className="text-3xl p-2">{attraction}</h1>
            <h2 className="text-2xl italic p-2">{city}, {region}</h2>
            <p className="text-lg p-2">{description}</p>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 my-2"></hr>
            <div className="flex p-2">
                <StyledButtonPlain onClick={()=>handlePick()}>Pick a Date</StyledButtonPlain>
                <StyledButtonPlain onClick={()=>router.back()}>Back</StyledButtonPlain>
            </div>
        </div>
    </>
}