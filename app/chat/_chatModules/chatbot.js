"use client"

import { LMStudioClient } from "@lmstudio/sdk";

export default async function fetchChat(session, backlog=[]){
    const schema = {
        type: "object",
        properties: {
            status: { type: "string" },
            context: { type: "string" },
            recommend: { type: "string" },
        },
        required: ["status", "content"],
    }

    backlog = [
        { role: "system", content: "Answer in structured JSON data, with the following keys:\n'status': A single letter that represents the status of the current conversation, for now only reply in the letter 'A'\n'context': The original content that you are going to reply with, do not attach contents from other fields\n'recommend': Optional, it is to evaluate what to recommend the user. ONLY FILL IN THIS FIELD WHEN YOU ARE SURE WHAT THE USER WANT. For now, do not respond with anything in this field" },
        { role: "user", content: "Introduce to me what you are and what you can do." },
    ]
    const client = new LMStudioClient();
    const modelPath = "lmstudio-community/Phi-3.1-mini-4k-instruct-GGUF/Phi-3.1-mini-4k-instruct-Q4_K_M.gguf";
    // const modelPath = "lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf";
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
        return {content, backlog};
    } catch (error) {
        console.log("Failed to parse JSON", error);
        return -1;
    }
}