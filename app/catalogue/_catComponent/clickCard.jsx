'use client'
import StyledButtonPlain from "@/app/_mainStyleComponent/StyledButtons";

export default function AttrCard({ idx, item, desFunc, dateFunc }){
    if (item != null && item.length !== 0){
        const {pid, rid, city, attraction, image, brief} = item;

        return (
            <div key={idx} onClick={()=>desFunc(pid, rid)} className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 hover:cursor-pointer">
                    <h1 className="text-2xl">{attraction}</h1>
                    <h2 className="mt-2 text-xl">{city}, {rid === 0 ? "Hong Kong" : "Taiwan"}</h2>
                    <h4 className="mt-2 text-md font-light">{brief}</h4>
                    <div className="flex w-full items-center justify-end">
                        <StyledButtonPlain onClick={(e)=>dateFunc(e)}>Pick a date</StyledButtonPlain>
                    </div>
            </div>
        )
    }

    return (
        <div key={idx} onClick={()=>desFunc("#", "#")} className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400">
                <h1 className="text-2xl">ASDF</h1>
                <h2 className="mt-2 text-xl">ASDFASDF</h2>
                <h4 className="mt-2 text-md font-light">
                    Dolor non magna ut laborum aute dolore deserunt labore ex dolore id ex. Officia cupidatat laborum ipsum velit ad quis minim enim esse occaecat deserunt. Voluptate nostrud nulla exercitation esse nostrud quis laborum aliquip non adipisicing aute ad. Quis deserunt nulla excepteur. Quis qui fugiat pariatur cupidatat voluptate. Laborum in ullamco aliqua dolore excepteur duis non velit dolor laboris.
                </h4>
                <div className="flex w-full items-center justify-end">
                    <StyledButtonPlain onClick={(e)=>dateFunc(e)}>Pick a date</StyledButtonPlain>
                </div>
        </div>
    )
}