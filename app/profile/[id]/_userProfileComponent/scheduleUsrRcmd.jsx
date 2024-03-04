'use client'

import RcmdLinkedCard from "@/app/_mainComponent/rcmdCard";
import Link from "next/link";

function haveRcmd(items){
    console.log(items);
    if(items && items[0].length > 0){
        return (
            <div className="flex flex-row flex-grow w-full max-w-screen h-[30vh] overflow-x-auto gap-5 items-center scrollbar-thumb-gray-500 scrollbar-track-gray-600 scrollbar-thin scroll-smooth">
                {items.map((item, i) => <RcmdLinkedCard id={i} city={item.city} attraction={item.attraction} linkUrl="#" bgUrl={item.bg_url}/>)}
            </div>
        )
    }
    
    return (
        <h2 className="text-xl font-light">We don't have anything for you yet. How about you comeback later?</h2>
    )
}

export default function ScheduleUsrRcmd( { items } ){
    return (
    <div className="flex flex-wrap flex-col p-6 gap-5">
        <h1 className="text-3xl font-sans font-light">How about more attractions that fit your schedule?</h1>
        <hr className="h-px -my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        {haveRcmd(items)}
    </div>
    )
}