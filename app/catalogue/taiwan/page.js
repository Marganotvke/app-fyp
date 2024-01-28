import { supabase } from "@/supabaseClient";
import { use } from "react";
import AttrCard from "../_catComponent/clickCard";
import AttrList from "../_catComponent/attrList";

// async function fetchPlaces(){
//     const {data, error} = await supabase
//         .from('places')
//         .select()
  
//     if (data && data.length > 0){
//       return data;
//     }else{
//       return error;
//     }
//   }

export default function Page(){
    // const data = use(fetchPlaces());
    let datatmp = Array(20).fill(null);

    return <>
        <h1 className="text-4xl font-light m-2">Taiwan</h1>
        <AttrList cardData={datatmp} />
    </>
}