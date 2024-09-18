'use client'

import { useRouter } from "next/navigation"
import StyledButtonPlain from "@/app/_mainStyleComponent/StyledButtons"
import { useState, useEffect } from "react";
import LoadThrobber from "@/app/_mainComponent/loadThrobber";

export default function AttrDes( {items, rating} ){
    const [loaded, setLoaded] = useState(false);
    const router = useRouter()
    if(!items){
        router.push("/500")
        return null;
    }

    const {pid, rid, city, attraction, description, image, brief} = items[0];
    const region = rid === 0 ? "Hong Kong" : "Taiwan";

    useEffect(()=>{
        setLoaded(true);
    },[])

    if (!loaded) {
        return <LoadThrobber />
    }

    return <>
        <div className="container max-w-full font-light">
            {image ? <img src={image} className="float-left m-2 w-[30%] rounded-xl"></img> : null}
            <h1 className="text-3xl p-2">{attraction}</h1>
            <h2 className="text-2xl italic p-2">{city}, {region}</h2>
            <p className="text-lg p-2">{description}</p>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 my-2"></hr>
            <StyledButtonPlain onClick={()=>router.back()}>Back</StyledButtonPlain>
        </div>
    </>
}