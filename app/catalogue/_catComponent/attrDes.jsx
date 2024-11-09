'use client'

import { useRouter } from "next/navigation"
import StyledButtonPlain from "@/app/_mainStyleComponent/StyledButtons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { DatePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, today } from "@internationalized/date";

function DateSelect( { submitFunc, quitFunc, isInvalidDate, router } ){
    const {data: session, status} = useSession();
    const [selectedDate, setSelectedDate] = useState(false);
    const [note, setNotes] = useState("");

    if(status !== "authenticated"){
        router.push("/login");
        return null;
    }

    return (
        <div className="h-[100%] w-[100%] backdrop-blur bg-slate-800 z-50 top-0 fixed bg-opacity-50">
            <div className="flex flex-col max-w-screen max-h-screen justify-center items-center gap-4 p-4">
                <DatePicker label="Select Date" variant="flat" showMonthAndYearPickers
                className="dark"
                dateInputClassNames={{inputWrapper:"bg-slate-700 hover:bg-slate-700", description: "text-gray-200"}}
                classNames={{calendarContent: 'bg-slate-700 dark', calendar:'dark bg-slate-700'}}
                onChange={setSelectedDate} isRequired isInvalid={isInvalidDate} errorMessage="Please enter a valid date."  description="You can select multiple dates for the same destination."
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
    const router = useRouter();
    const [showDate, setShowDate] = useState(false);
    const [isInvalidDate, setIsInvalidDate] = useState(false);

    if(!items){
        router.push("/500")
        return null;
    }

    const {pid, rid, city, attraction, description, image, brief} = items[0];
    const region = rid === 0 ? "Hong Kong" : "Taiwan";

    const handlePick = () => {
        setShowDate(true);
    }

    const handleUnPick = () => {
        setShowDate(false);
    }

    const handleSubmit = (e, date, note) => {
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
        console.log(pickedDetail);
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