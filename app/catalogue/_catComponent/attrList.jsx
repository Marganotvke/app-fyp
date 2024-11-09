'use client'
import AttrCard from "./clickCard";
import { useRouter } from "next/navigation";

export default function AttrList( {cardData} ){
    const router = useRouter();


    const handleDes = (pid, rid) => {
        router.push(`/catalogue/${rid}/${pid}`);
    }

    return (
        <div>        
            <div className="h-full columns-2 gap-0 p-5 mx-5">
                {cardData.map((item, i) => <AttrCard idx={i} item={item} desFunc={handleDes} />)}
            </div>
        </div>
    )
}