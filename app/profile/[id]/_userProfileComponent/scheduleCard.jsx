'use client'

export default function ScheduleCard({id, month, date, cid, handleCID}){
    const handleClick = (sid) => {
        handleCID(sid);
    }
    
    return (
        <button key={id} type="button" onClick={()=>handleClick(id)} className={`flex flex-col p-5 min-w-[15vh] rounded-xl items-center justify-center transition ease-in-out duration-150 ${cid===id? "text-gray-200 bg-blue-950": "text-gray-800 bg-slate-300 hover:text-gray-200 hover:bg-blue-800"} `}>
            <div className="text-center">
                <h3 className="text-xl p-3">{month}</h3>
                <h1 className="text-4xl p-3">{date}</h1>
            </div>
        </button>
    )
}