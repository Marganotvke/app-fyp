import { supabase } from "@/supabaseClient";
import { use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserSchedule from "./_userProfileComponent/userSchedule";
import { redirect } from "next/navigation";
import UserHeader from "./_userProfileComponent/userHeader";
import StyledBarPad from "@/app/_mainStyleComponent/StyledBarPad";
import UsrLocSelect from "./_userProfileComponent/usrLocSelect";
import UsrLocRcmd from "./_userProfileComponent/usrLocRcmd";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function fetchUserInfo(session){
    if (!session) return -1;
    const id = session.user.id;

    const {data, error} = await supabase
        .from('user_info')
        .select('schedule')
        .eq("id", id)

    if (data && data.length > 0){
        return data;
    }else{
        if(!error) return "Internal Server Error";
        return error;
    }
}

async function fetchUsrRcmd(session){
    if(!session) return null;
    const id = session.user.id;

    const {data, error} = await supabase
        .from("user_info")
        .select("recommend,location")
        .eq("id", id)

    if (data && data.length > 0){
        return data;
    }else{
        if(!error) return "Internal Server Error";
        return error;
    }
}

async function upsertUsrLoc(session, loc){
    if(!session) return null;
    const id = session.user.id;

    const {error} = await supabase
        .from("user_info")
        .upsert({id:id, location: loc})
        .select()

    if(error) return error;
}


export default function Profile( {params} ){
    const session = use(getServerSession(authOptions));
    const res = use(fetchUserInfo(session));
    const usrDataTmp = use(fetchUsrRcmd(session));
    var [usrRcmd, usrLoc] = [null, null];
    if (usrDataTmp){
        [usrRcmd, usrLoc] = [usrDataTmp[0].recommend, usrDataTmp[0].location];
    }

    if (res == -1){
        redirect("/");
    };

    const handleClick = async () => {
        "use server";
        var now = new Date();
        console.log(`[${now.toString()}] Request: User ${session.user.id} request booking`);
        'use client';
        redirect("https://www.google.com/search?q=book+a+hotel");
    }

    const handleSave = async (locUsrLoc) => {
        "use server";
        const {error} = await upsertUsrLoc(session, locUsrLoc);
        if(error){
            console.log(error);
        }else{
            var now = new Date();
            console.log(`[${now.toString()}] Request: User ${session.user.id} change location to ${locUsrLoc}`);
            revalidatePath(`/profile/${session.user.name}`);
        }
    }

    return <div className="min-h-[calc(100vh-3.5rem)] h-full">
        <UserHeader />
        <UserSchedule schedules={res} handleClick={handleClick}/>
        <StyledBarPad />
        <UsrLocSelect usrLoc={usrLoc} handleSave={handleSave}/>
        <UsrLocRcmd />
    </div>
}