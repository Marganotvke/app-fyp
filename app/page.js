import { supabase } from "@/supabaseClient";
import HomeBanner from "./_mainComponent/homeBanner";
import HomeRcmd from "./_mainComponent/homeRcmd";
import UserRcmd from "./_mainComponent/usrRcmd";
import { use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import UsrLocRcmd from "./profile/[id]/_userProfileComponent/usrLocRcmd";

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

export default function HomePage() {
  const session = use(getServerSession(authOptions));
  const recommend = use(fetchRcmd());
  const usrRcmd = use(fetchUsrRcmd(session));

  return <>
    <HomeBanner>
      <HomeRcmd items={recommend}/>
      {session ? <UsrLocRcmd/> : 
        <h1 className="px-6 pb-6 text-3xl font-sans font-light">Login to get personalized recommendations!</h1>
      }
    </HomeBanner>
  </>
}