'use client'
import { useState } from "react"
import AttrCard from "./clickCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AttrList( {cardData} ){
    const [showDate, setShowDate] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const handlePick = () => {
        if(status !== "authenticated"){
            router.replace("/login");
            return;
        }
        setShowDate(true);
        console.log(showDate)
    }

    const handleUnPick = () => {
        setShowDate(false);
    }

    return (
        <div>        
            <div className="h-full columns-2 gap-0 p-5 mx-5">
                {cardData.map((item, i) => <AttrCard idx={i} item={item} handleFunc={handlePick}/>)}
             </div>
             {showDate? <DateSelect quitFunc={handleUnPick} /> : null}
         </div>
    )
}

export function DateSelect( { cid, quitFunc } ){
    return (
        <div className="h-[100%] w-[100%] backdrop-blur bg-slate-800 z-50 absolute top-0 bg-opacity-50">
            <button onClick={()=>quitFunc()} className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">No</button>
        </div>
    )
}