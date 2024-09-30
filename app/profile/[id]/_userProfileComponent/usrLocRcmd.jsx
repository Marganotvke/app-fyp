import { supabase } from '@/supabaseClient';
import { use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import findNearestNeighbors from '@/app/modules/knn';

async function fetchPlacesLabels(rid){
    var [ridTmp, ridTmp2] = [0, 1];
    if (rid === 0 || rid === 1) {
        [ridTmp, ridTmp2] = [rid, rid];
    }
    const { data, error } = await supabase
    .from('places')
    .select('rid, pid, attraction, cats')
    .or(`rid.eq.${ridTmp},rid.eq.${ridTmp2}`)

    if (data && data.length > 0){
        return data;
    }
    if (!error) return "Internal Server Error";
    return error;
}

async function fetchUsrInfo(id){
    const { data, error } = await supabase
        .from('user_info')
        .select('location,recommend')
        .eq('id', id)
    
    if (data && data.length > 0){
        return data;
    }
    if (!error) return "Internal Server Error";
    return error;
}

export default function UsrLocRcmd(){
    const session = use(getServerSession(authOptions));
    const id = session.user.id;
    const usrInfo = use(fetchUsrInfo(id));
    if (usrInfo === "Internal Server Error" || !usrInfo){throw new Error("Internal Server Error");}
    const attrac = use(fetchPlacesLabels(usrInfo[0].location));
    if (attrac === "Internal Server Error" || !attrac){throw new Error("Internal Server Error");}

    const usrRcmdFooBar = Array.from({length: 10}, () => Math.round(Math.random()*100)/100);
    var dataset = [];
    for (var i = 0; i < attrac.length; i++) {
        dataset.push(attrac[i].cats);
    }
    const res = findNearestNeighbors(dataset, usrRcmdFooBar, 5);
    const resAttrac = attrac.filter((x, i) => res.includes(i));
    const resAttracIdNames = resAttrac.map(({rid, pid, attraction}) => ({rid, pid, attraction}));

    return <>
        <h1 className="text-md font-light">{JSON.stringify(["ticket","rural","natural","outdoor","adultness","crowdedness","transport","accessibility","duration","purchasing"])}</h1>
        <h1 className="text-md font-light">{JSON.stringify(usrRcmdFooBar)}</h1>
        <h1 className="text-md font-light">{JSON.stringify(resAttracIdNames)}</h1>
    </>
}
