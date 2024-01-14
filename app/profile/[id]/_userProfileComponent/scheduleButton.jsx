'use client'

export default function ScheduleButton({id, cid, handleClick}){
    if (id !== cid){
        return null;
    }

    return (
        <button key={id} onClick={()=>handleClick()} className={`flex flex-col p-5 min-w-[15vh] rounded-xl items-center justify-center transition ease-in-out duration-150 ${cid===id? "text-gray-200 bg-blue-950": "text-gray-800 bg-slate-300 hover:text-gray-200 hover:bg-blue-800"} `}>
            Delete
        </button>
    )
}