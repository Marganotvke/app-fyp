'use client'

import RcmdLinkedCard from "@/app/_mainComponent/rcmdCard";
import StyledBar from "@/app/_mainStyleComponent/StyledBarPad";

function haveRcmd(items){
    if(items && items[0].length > 0){
        return (
            <div className="flex flex-row flex-grow w-full max-w-screen h-[30vh] overflow-x-auto gap-5 items-center scrollbar-thumb-gray-500 scrollbar-track-gray-600 scrollbar-thin scroll-smooth">
                {items.map((item, i) => <RcmdLinkedCard id={i} city={item.city} attraction={item.attraction} linkUrl="#" bgUrl={item.bg_url}/>)}
            </div>
        )
    }
    
    return (
        <h2 className="text-xl font-light">We don't have anything for you yet. How about you check back later?</h2>
    )
}

export default function ScheduleUsrRcmd( { items } ){
    return (
    <div className="flex flex-wrap flex-col p-6 gap-5">
        <h1 className="text-3xl font-sans font-light">How about more attractions that fits you?</h1>
        <StyledBar />
        {haveRcmd(items)}
    </div>
    )
}