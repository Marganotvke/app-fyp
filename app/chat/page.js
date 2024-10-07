import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LMStudioClient } from "@lmstudio/sdk";

async function fetchChat(session){
    const client = new LMStudioClient();
    const modelPath = "lmstudio-community/Phi-3.1-mini-4k-instruct-GGUF/Phi-3.1-mini-4k-instruct-Q4_K_M.gguf";
    const model = await client.llm.load(modelPath);

    var prediction = model.respond([
        { role: "system", content: "Always answer in rhymes." },
        { role: "user", content: "Please introduce yourself." },
    ]);

    for await (const text of prediction){
        console.log(text);
    }

    const {stats} = await prediction;
    console.log(stats);
}

export default function Chat(){
    const session = use(getServerSession(authOptions));
    if (!session || session.status === "unauthenticated") {redirect("/login"); return null;}

    
}