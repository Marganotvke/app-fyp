import AttrDes from "../../_catComponent/attrDes";
import { supabase } from "@/supabaseClient";
import { use } from "react";

async function fetchAttrDes(pid, rid){
    const {data, error} = await supabase
        .from('places')
        .select()
        .eq("pid", pid)
        .eq("rid", rid)

    if (data && data.length > 0){
        return data;
    }else{
        return error;
    }
        
}

export default function catPage( {params} ){
    const data = use(fetchAttrDes(params.pid, params.rid));

    return (
        <AttrDes items={data} />
    )
}