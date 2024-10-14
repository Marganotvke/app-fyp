'use client'

import RcmdLinkedCard from "./rcmdCard";

export default function HomeRcmd( { items } ){
    if(items && items.length > 0 && !items[0].hasOwnProperty("recommend")){
        return (
        <div className="flex flex-wrap flex-col p-6 gap-5">
            <h1 className="text-3xl font-sans font-light">Discover New Oppotunities.</h1>
            <hr className="h-px -my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex flex-row flex-grow w-full max-w-screen h-[30vh] overflow-x-auto gap-5 items-center scrollbar-thumb-gray-500 scrollbar-track-gray-600 scrollbar-thin scroll-smooth">
                {items.map((item, i) => <RcmdLinkedCard id={i} city={item.city} attraction={item.attraction} linkUrl="#" bgUrl={item.bg_url}/>)}
            </div>
        </div>
        )
    }else{
        return (
            <h1 className="text-3xl font-sans font-light">{JSON.stringify(items)}</h1>
        )
    }
}