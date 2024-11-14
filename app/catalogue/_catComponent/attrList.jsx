'use client'
import AttrCard from "./clickCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { createClient } from "pexels";

export default function AttrList( {cardData} ){
    const router = useRouter();
    const [orderedCard, setOrderedCard] = useState(cardData);
    const mapTextToNum = ["Default", "Ticket", "Rural", "Natural", "Outdoor", "Adultness", "Crowdedness", "Transport", "Accessibility", "Duration", "Purchasing"];

    useEffect(() => {
        setOrderedCard(cardData);
    },[]);

    const handleDes = (pid, rid) => {
        router.push(`/catalogue/${rid}/${pid}`);
    }

    const handleOrdering = (value) => {
        const ordering = mapTextToNum.indexOf(value)-1;
        if(ordering === -1){
            setOrderedCard(cardData);
        }else{
            setOrderedCard([...cardData].sort((a, b) => {
                return a.cats[ordering] - b.cats[ordering];
            }).reverse());
        }
    }

    return (
        <div className="flex flex-row w-full">
            <RadioGroup classNames={{label: "text-gray-50"}} className="sticky flex h-[calc(100vh-3.75rem)] left-0 top-[3.75rem] w-[15vw] bg-slate-500 z-10 p-2 mt-5 dark" label="Sort By (Descending):" defaultValue="Default" onValueChange={handleOrdering}>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Default">Default</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Ticket" description="Ticket Price">Ticket</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Rural" description="How far away it is from the city">Rural</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Natural" description="Nature created">Natural</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Outdoor" description="Outdoor activity">Outdoor</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Adultness" description="How mature is needed for visitors">Adultness</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Crowdedness" description="How crowded it is usually">Crowdedness</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Transport" description="How easy to get to here">Transport</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Accessibility" description="Accessibility support for">Accessibility</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Duration" description="How long it takes to complete an activity">Duration</Radio>
                <Radio classNames={{label: "text-gray-50", description: "text-gray-300"}} value="Purchasing" description="Purchasing power required">Purchasing</Radio>
            </RadioGroup>
            <div className="flex-1 h-full columns-2 gap-0 p-5 mx-5">
                {orderedCard.map((item, i) => <AttrCard idx={i} item={item} desFunc={handleDes} />)}
            </div>
        </div>
    )
}