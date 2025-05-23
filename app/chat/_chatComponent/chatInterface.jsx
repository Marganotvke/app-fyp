"use client"
import ChatDisplay from "./chatDisplay";
import { use, useEffect, useState } from "react";
import { LMStudioClient } from "@lmstudio/sdk";
import { supabase } from '@/supabaseClient';

async function fetchRcmd(session){
    const {data, error} = await supabase
        .from('user_info')
        .select('recommend')
        .eq('id', session.user.id);

        if (data && data.length > 0){
            return data;
        }
        if (!error) return "Internal Server Error";
        return -1; 
}

async function fetchChat(session, profile, backlog){
    if (!backlog){
        backlog = [
            { role: "system", content: "You are a travel assistant that helps understand what users wants, and also to measure what the user's personal preference is. You are to provide a JSON with the following parameters:\n'response':You normal conversation. Be active and helpful. Try not to just rephrase what the user said and reply with nothing else. You can use markdown.\n'profile':An array with a size of 10 representing the following fields with a decimal number that represents the user's preference: [ticket(0 is free, 1 is average and 2 is high-priced),rural(0 for urban, 1 for rural),natural(0-1),outdoor(0-1),adultness(0-1),crowdedness(0-1),transport(0-1, how hard it is to use public transport to get to the destination),accessibility(0-1),duration(0 for 15 min stay, 1 for three hours or higher),purchasing(0 for non-profit destination, 1 for high wealth tourists such as high class shopping malls)]. Strictly respond in this array format. Adjust the profile according to the conversation. Do not mix this field with simply recommending places. Recommend places in the 'response' field. If you respond anything that is not an array, the program will crash and risk system shutdown, hurting the customer experience." },
            { role: "system", content: `The following is all the places from either Hong Kong or Taiwan that you can talk about. Do not talk about places from outside these two regions and this list.`},
            { role: "system", content: `["Victoria Harbour", "Star Ferry Pier", "Lan Kwai Fong", "Stanley", "Repulse Bay", "Ocean Park Hong Kong", "Sai Wan Ho", "Hong Kong Film Archive", "Tai On Building", "Hong Kong Art Museum", "Avenue of Stars", "Clock Tower", "Chungking Mansions", "Hong Kong Heritage Discovery Centre", "Hong Kong Science Museum", "Hong Kong International Hobby and Toy Museum", "Sky100", "Kowloon Park", "Nathan Road", "Ocean Terminal", "The Peninsula Hotel", "Ladies' Market", "Hong Kong Space Museum", "Wong Tai Sin Temple", "Lei Yue Mun", "Che Kung Temple", "Cheung Chau", "Lamma Island", "Beihai Tunnel", "Hong Kong Disneyland Resort", "Hong Kong Heritage Museum", "Hong Kong Railway Museum", "Hong Kong Wetland Park", "Jockey Club Museum of Climate Change", "Bopiliao Historic Block", "Daxi Wude Hall", "Eternal Golden Castle", "First Guesthouse", "Former British Consulate at Takao", "Former Japanese Navy Fongshan Communication Center", "Former Tainan Weather Observatory", "Fort Provintia", "Fort Zeelandia", "Fuxing Barn", "Great South Gate", "Gulongtou Zhenwei Residence", "Jhen Wen Academy", "Kaohsiung Grand Hotel", "Keelung Fort Commander's Official Residence", "Lee Teng-fan's Ancient Residence", "Niumatou Site", "North Gate of Xiong Town", "Presidential Office Building", "Qihou Fort", "Shihlin Paper Mill", "Taipei Guest House", "Tianma Tea House", "Walls of Taipei", "Wistaria Tea House", "Wude Martial Arts Center", "Wufeng Lin Family Mansion and Garden", "Yuanshan Grand Hotel", "Zhongshan Hall", "228 Peace Memorial Park", "Black Bat Squadron Memorial Hall", "Chen Jhong-he Memorial Hall", "Chiang Kai-shek Memorial Hall", "Chin Pao San", "Cihu Mausoleum", "Eternal Spring Shrine", "Gaoshi Shrine", "Green Island Human Rights Culture Park", "Guo Ziyi Memorial Hall", "Jiji Military History Park", "Kagi Shrine", "Koxinga Shrine", "Liu Clan Shrine", "National Revolutionary Martyrs' Shrine", "Ōgon Shrine", "Shigong Shrine", "Sun Yat-sen Memorial Hall", "Taichung Martyrs' Shrine", "Taoyuan Martyrs' Shrine", "Tomb of Chen Jhong-he", "Wang Yun-wu Memorial Hall", "Wukou Village Liou Family Ancestral Hall", "Yang Family Ancestral Hall", "Zhong-Sheng-Gong Memorial", "Chiayi Performing Arts Center", "Dadong Arts Center", "Hongmaogang Cultural Park", "Hsinchu City Art Site of Railway Warehouse", "Huashan 1914 Creative Park", "Liberty Square", "Lukang Artist Village", "National Center for Traditional Arts", "Victoria Peak", "Soho", "Dr. Sun Yat-sen Museum", "Hong Kong Cultural Centre"]`},
            { role: "system", content: "Be patient, unthreatening, helpful. Keep the conversation on track. If the user is not talking about travel, steer the conversation back to travel. Ask for more information from the user so that you can build the profile faster. Speak English. Start by asking the user where they would like to visit first." },
            { role: "system", content: `If a user show great interest in an attraction, you can guide them to add a place to schedule. The steps are as follows: navigate to the catalog, click on the destination they want, click "Pick a date", choose a date and select "Add to schedule". They can view and delete the schedule inside their own profile page (/profile/${session.user.name}).` },
        ];
        if(profile && Array.isArray(profile)){backlog.push({role: "system", content:`User already has a preference profile, which is: ${profile}`})};
        backlog.push({ role: "user", content: "Introduce yourself."});
    }

    const schema = {
        type: "object",
        properties: {
            response: { type: "string" },
            profile: { type: "string" },
        },
        required: ["response"],
        "additionalProperties": false,
    }

    const client = new LMStudioClient({
        
    }); // use lmstudio 0.3.2
    const modelPath = "lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf";
    var model;
    try {
        model = await client.llm.get({path: modelPath}); 
    } catch (error) {
        console.log("Model not found, loading a new one");
        try {
            model = await client.llm.load(modelPath);
        } catch (error) {
            console.log("Failed to load model", error);
            return -1;
        }
    }

    var {content, stats} = await model.respond( // Model responses are assigned to role "assistant"
        backlog,
        {structured: { type: "json", jsonSchema: schema },}
    );

    console.log(JSON.stringify(stats));
    try {
        content = JSON.parse(content);
        try{
            content.profile = JSON.parse(content.profile);
            const err = await supabase
                .from('user_info')
                .update({recommend: content.profile})
                .eq('id', session.user.id);
                if (err) {
                    throw err;
                }
        }catch (error){
            if(error.status !== 204){
                console.log("Failed to parse/push profile:", error);
            }
        }
        backlog.push({role: "assistant", content: JSON.stringify({response: content.response, profile: content.profile})});
        console.log(content);
        return [content, backlog];
    } catch (error) {
        console.log("Failed to parse JSON", error);
        return -1;
    }
}

export default function ChatInterface({session}) {
    const [res, setRes] = useState(null);
    const [backlog, setBacklog] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const fetchAsyncChat = async () => {
        var data = await fetchRcmd(session);
        data !== -1 ? data : undefined;
        const [tmpRes, tmpBacklog] = await fetchChat(session, data);
        setRes(tmpRes);
        setBacklog(tmpBacklog);
        setLoaded(true);
    }

    useEffect(() => {fetchAsyncChat()},[]);


    const handleResponse = async (e, ctx) => {
        setLoaded(false);
        e.stopPropagation();
        e.preventDefault();
        backlog.push({role: "user", content: ctx});
        const [tmpRes, tmpBacklog] = await fetchChat(session, undefined, backlog);
        setRes(tmpRes);
        setBacklog(tmpBacklog);
        setLoaded(true);
    }

    if (res === -1) {
        return <>
            <h1>An error happend, please try again later!</h1>
            <h1>Error Code: 500</h1>
        </>
    }
    return <>
        <ChatDisplay handleResponse={handleResponse} loaded={loaded} ctx={backlog} />
    </>
}