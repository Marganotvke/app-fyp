import { supabase } from "@/supabaseClient";
import HomeBanner from "./homeBanner";
import RcmdLinkedCard from "./rcmdCard";
import { use } from "react";

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
  const recommend = use(fetchRcmd());

  return <>
    <HomeBanner>
      <div className="flex flex-wrap flex-col p-6 gap-5">
          <h1 className="text-3xl font-sans font-light">Discover New Oppotunities.</h1>
          <hr className="h-px -my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="flex flex-row flex-grow w-full max-w-screen h-[30vh] overflow-x-auto gap-5 items-center scrollbar-thumb-gray-500 scrollbar-track-gray-600 scrollbar-thin scroll-smooth">
            {recommend.map((item, i) => <RcmdLinkedCard id={i} city={item.city} attraction={item.attraction} linkUrl="#" bgUrl={item.bg_url}/>)}
          </div>
      </div>
    </HomeBanner>
  </>
}