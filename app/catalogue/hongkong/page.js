import { supabase } from "@/supabaseClient";
import { use } from "react";
import AttrList from "../_catComponent/attrList";

async function fetchPlaces(){
    const {data, error} = await supabase
        .from('places')
        .select()

    if (data && data.length > 0){
        return data;
    }else{
        return error;
    }
}

export default function Page(){
    let datatmp = Array(20).fill(null);

    return <>
        <h1 className="text-4xl font-light m-2">Hong Kong</h1>
        <AttrList cardData={datatmp} />
    </>
}