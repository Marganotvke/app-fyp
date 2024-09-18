import { supabase } from "@/supabaseClient";
import HomeBanner from "./_mainComponent/homeBanner";
import HomeRcmd from "./_mainComponent/homeRcmd";
import HomeUsrRcmd from "./_mainComponent/homeUsrRcmd";
import { use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function fetchRcmd(){
  const {data, error} = await supabase
      .from('Hot_Attractions')
      .select()
      .order("attraction_id", { ascending: true })

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

export default function HomePage() {
  const session = use(getServerSession(authOptions));
  const recommend = use(fetchRcmd());
  const usrRcmd = use(fetchUsrRcmd(session));

  return <>
    <HomeBanner>
      <HomeRcmd items={recommend}/>
      {session ? <HomeUsrRcmd items={usrRcmd}/> : 
        <h1 className="px-6 pb-6 text-3xl font-sans font-light">Login to get personalized recommendations!</h1>
      }
    </HomeBanner>
  </>
}