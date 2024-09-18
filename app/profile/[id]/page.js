import { supabase } from "@/supabaseClient";
import { use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserSchedule from "./_userProfileComponent/userSchedule";
import { redirect } from "next/navigation";
import UserHeader from "./_userProfileComponent/userHeader";
import ScheduleUsrRcmd from "./_userProfileComponent/scheduleUsrRcmd";

async function fetchUserInfo(session){
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

async function fetchUsrRcmd(session){
    if(!session) return null;
    const email = session.user.email;
  
    const {data, error} = await supabase
      .from("user_info")
      .select("recommend")
      .eq("email", email)
  
    if (data && data.length > 0){
      return data;
    }else{
      return error;
    }
  }

export default function Profile( {params} ){
    const session = use(getServerSession(authOptions));
    const res = use(fetchUserInfo(session));
    const usrRcmd = use(fetchUsrRcmd(session));
    console.log(JSON.stringify(res));
    if (res == -1){
        redirect("/");
        return null;
    };

    const handleClick = async (cid) => {
        "use server";
        console.log(cid);
    }


    return <>
        <UserHeader />
        <UserSchedule schedules={res} handleClick={handleClick}/>
        <ScheduleUsrRcmd items={usrRcmd}/>
    </>
}