'use client'

export default function AttrCard({ idx, item, desFunc }){
    if (item != null && item.length !== 0){
        const {pid, rid, city, attraction, bgUrl, brief} = item;

        return (
            <div key={idx} onClick={()=>desFunc(pid, rid)} className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 hover:cursor-pointer">
                    <h1 className="text-2xl">{attraction}</h1>
                    <h2 className="mt-2 text-xl">{city}, {rid === 0 ? "Hong Kong" : "Taiwan"}</h2>
                    <h4 className="mt-2 text-md font-light">{brief}</h4>
                    <div className="flex w-full items-center justify-end">
<<<<<<< HEAD
=======
                        <StyledButtonPlain onClick={(e)=>dateFunc(e, pid, rid)}>Pick a date</StyledButtonPlain>
>>>>>>> 1588eb34f2a980f82c157f16005b022ea7449f0b
                    </div>
            </div>
        )
    }
}