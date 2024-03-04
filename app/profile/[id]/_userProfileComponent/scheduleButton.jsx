'use client'

export default function ScheduleButton({id, cid, handleClick, children}){
    if (id !== cid || cid === -1){
        return null;
    }

    return (
        <button onClick={()=>handleClick()} className={"border rounded-lg p-2 m-2 hover:bg-slate-400 hover:text-slate-800"}>
            {children}
        </button>
    )
}