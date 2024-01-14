'use client'

export default function ScheduleComment({ idx, cid, content, handleFunc }){
    if (idx !== cid) return null;
    return (
        <div className="items-center justify-center text-center">
            <h1 className="text-2xl">Destination: {content.pid}</h1>
            <h1 className="text-2xl">Event: {content.eid}</h1>
            <h2 className="text-lg font-light">{content.comment}</h2>
            <button onClick={()=>handleFunc()} className={"border rounded-lg p-2 m-2 hover:bg-slate-400 hover:text-slate-800"}>
                Delete
            </button>
        </div>
        
    )
}