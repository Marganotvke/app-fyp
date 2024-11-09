'use client'
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatLogCard({idx, item}){
    const {role, content} = item;
    var tmpContent = null;

    if (role !== "system"){
        // need different handling for user and assistant format as user do not use content.response
        if (role === "user"){
            if (content !== "Introduce yourself."){
                return (
                    <div key={`u${idx}`} className={`break-inside-avoid-column w-full p-5 justify-center items-center bg-slate-700 text-md text-left font-semibold`}>
                        You: <Markdown key={`actx${idx}`} remarkPlugins={[remarkGfm]}>{content}</Markdown>
                    </div>
                )
            }else{
                return null;
            }
        }else{
            try {
                tmpContent = JSON.parse(content);
            }catch (error){
                return (
                    <div key={`u${idx}`} className={`break-inside-avoid-column w-full p-5 justify-center items-center bg-slate-500`}>
                        <h4 key={`actx${idx}`} className="font-light text-md mt-2 text-left">{"Failed to parse response: "+error}</h4>
                    </div>
                )
            }
            return (
                <div key={`u${idx}`} className={`break-inside-avoid-column w-full p-5 justify-center items-center bg-slate-500 font-light text-md text-left`}>
                    AI: <Markdown key={`actx${idx}`} remarkPlugins={[remarkGfm]}>{tmpContent.response}</Markdown>
                </div>
            )
        }
    }

    return null;
} 