import { supabase } from '@/supabaseClient';
import { KNN, predict } from 'ml-knn';

async function fetchPlacesLabels(rid){
    var [ridTmp, ridTmp2] = [0, 1];
    if (rid === 0 || rid === 1) {
        [ridTmp, ridTmp2] = [rid, rid];
    }
    const { data, error } = await supabase
    .from('places')
    .select('pid, cats')
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

export async function POST(req) {
    const { id } = req.query;
    
    try {
        usrInfo = await fetchUsrInfo(id);
        if (usrInfo === "Internal Server Error" || !usrInfo){throw new Error("Internal Server Error");}
        attrac = await fetchPlacesLabels(usrInfo[0].location);
        if (attrac === "Internal Server Error" || !attrac){throw new Error("Internal Server Error");}

        // console.log(JSON.stringify());
        
        return NextResponse.json(
            {message: `Reachable for User: ${id}`},
            {data: attrac},
            {status: 200},
        );
    }catch (error){
        return NextResponse.json(
            {message: `Internal Server Error`},
            {error: error},
            {status: 500},
        );
    }
}