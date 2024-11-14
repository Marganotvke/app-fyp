'use client'

export default function ScheduleComment({ idx, cid, content, handleFunc }){
    if (idx !== cid || cid === -1) return null;
    return (
        <div className="items-center justify-center text-center">
            <h1 className="text-2xl">Destination: {content.eid}</h1>
            <h1 className="text-2xl">City: {content.pid}</h1>
            <h2 className="text-lg font-light">Note: {content.comment}</h2>
        </div>
        
    )
}