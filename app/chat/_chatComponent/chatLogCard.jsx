'use client'

export default function ChatLogCard({idx, item}){
    const {role, content} = item;
    var tmpContent = null;

    if (role !== "system"){
        // need different handling for user and assistant format as user do not use content.response
        if (role === "user"){
            return (
                <div key={`u${idx}`} className={`break-inside-avoid-column w-full p-5 justify-center items-center bg-slate-700`}>
                    <h4 key={`uctx${idx}`} className="text-md mt-2 text-left font-semibold">{`You: ${content}`}</h4>
                </div>
            )
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
                <div key={`u${idx}`} className={`break-inside-avoid-column w-full p-5 justify-center items-center bg-slate-500`}>
                    <h4 key={`actx${idx}`} className="font-light text-md mt-2 text-left">{`AI: ${tmpContent.response}`}</h4>
                </div>
            )
        }
    }

    return null;
} 