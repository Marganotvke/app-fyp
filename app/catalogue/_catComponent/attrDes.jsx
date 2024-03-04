'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import StyledButtonPlain from "@/app/_mainStyleComponent/StyledButtons"
import { useState, useEffect } from "react";
import LoadThrobber from "@/app/_mainComponent/loadThrobber";

export default function AttrDes( {items} ){
    const [loaded, setLoaded] = useState(false);
    const router = useRouter()
    if(!items){
        router.push("/500")
        return null;
    }

    const {pid, rid, city, attraction, description, image, brief} = items[0];
    const region = rid===0? "Hong Kong" : "Taiwan";

    useEffect(()=>{
        setLoaded(true);
    },[])

    if (!loaded) {
        return <LoadThrobber />
    }

    return <>
        <div className="container max-w-full font-light">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Kowloon_Walled_City_Park_Overview_201807.jpg" className="float-right m-2 w-[30%] rounded-xl"></img>
            <h1 className="text-3xl p-2">{attraction}</h1>
            <h2 className="text-2xl italic p-2">{city}, {region}</h2>
            <p className="text-lg p-2">{description}</p>
            <StyledButtonPlain onClick={()=>router.back()}>Back</StyledButtonPlain>
        </div>
    </>
}