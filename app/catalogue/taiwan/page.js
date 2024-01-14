import { supabase } from "@/supabaseClient";
import { use } from "react";
import AttrCard from "../_catComponent/clickCard";

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
    let data = Array(20).fill(null);

    return <>
        <div className="h-full columns-2 gap-0 p-5 mx-5">
            {data.map((item, i) => <AttrCard cid={i} item={item}/>)}
        </div>
    </>
}