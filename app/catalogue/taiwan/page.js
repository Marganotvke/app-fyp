import { supabase } from "@/supabaseClient";
import { use } from "react";
import AttrList from "../_catComponent/attrList";

async function fetchPlaces(){
    const {data, error} = await supabase
        .from('places')
        .select()
        .eq("rid", 1)

    if (data && data.length > 0){
        return data;
    }else{
        return error;
    }
}

export default function Page(){
    let placesTmp = use(fetchPlaces());

    return <>
        <h1 className="text-4xl font-light m-2">Taiwan</h1>
        <AttrList cardData={placesTmp} />
    </>
}