import { supabase } from "@/supabaseClient";
import { use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserProfile from "./_userProfileComponent/userProfile";
import UserSchedule from "./_userProfileComponent/userSchedule";
import { redirect } from "next/navigation";

async function fetchUserInfo(){
    const session = await getServerSession(authOptions);
    if (!session) return -1;
    const email = session.user.email;

    const {data, error} = await supabase
        .from('user_info')
        .select('schedule')
        .eq("email", email)

    if (data && data.length > 0){
        return data;
    }else{
        return error;
    }
}

export default function Profile( {params} ){
    const res = use(fetchUserInfo());
    if (res == -1){
        redirect("/");
        return null;
    };

    return <>
        <UserProfile />
        <UserSchedule schedules={res}/>
    </>
}