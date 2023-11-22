'use client'

export default function ScheduleComment({ idx, cid, content }){
    if (idx !== cid) return null;
    return (
        <div className="items-center justify-center text-center">
            <h1 className="text-2xl">Destination:{content.pid}</h1>
            <h2 className="text-xl font-light">{content.comment}</h2>
        </div>
    )
}