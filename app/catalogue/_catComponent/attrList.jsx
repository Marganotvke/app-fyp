'use client'
import { useEffect, useState } from "react"
import AttrCard from "./clickCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AttrList( {cardData} ){
    const [showDate, setShowDate] = useState(false);
    const [dateSelected, setDateSelected] = useState([]); // [cid, cid, ...]
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(showDate){
            document.body.classList.add("overflow-y-hidden");
        }else{
            document.body.classList.remove("overflow-y-hidden");
        }
    })

    const handlePick = (e) => {
        e.stopPropagation();
        if(status !== "authenticated"){
            router.replace("/login");
            return;
        }
        setShowDate(true);
    }

    const handleUnPick = () => {
        setShowDate(false);
    }

    const handleSubmit = () => {
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

export function DateSelect( { rid, pid, submitFunc, quitFunc } ){
    return (
        <div className="h-[100%] w-[100%] backdrop-blur bg-slate-800 z-50 top-0 absolute bg-opacity-50">
            <div className="flex max-w-screen maxh-h-screen justify-center items-center gap-4">
                <button onClick={()=>submitFunc()} className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Select</button>
                <button onClick={()=>quitFunc()} className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Cancel</button>
            </div>
        </div>
    )
}