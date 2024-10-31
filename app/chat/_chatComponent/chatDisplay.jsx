"use client"
import { useState, useRef } from "react";
import ChatLogCard from "./chatLogCard";

export default function ChatDisplay({handleResponse, ctx, loaded}) {
    const ref = useRef(null);
    const [chat, setChat] = useState("");

    const handleChange = (e) => {
        setChat(e.target.value);
    }

    return (
    <>
        <div className="flex-col flex h-[calc(100vh-3.75rem)]">
            <div className="flex-1 flex-col-reverse w-full justify-end overflow-y-scroll overscroll-auto scrollbar-thin">
                {ctx.map((item, i) => <ChatLogCard idx={i} item={item} />)}
            </div>
            <footer className="flex max-h-[10%] w-full justify-between bg-slate-700 z-10 bottom-0 sticky flex-col p-2">
                    <form ref={ref} onSubmit={(e)=>{handleResponse(e,chat); ref.current?.reset()} }>
                        <input type="text" id="response" name="response" required className="w-[90%] m-2 p-2 border rounded-md bg-slate-800 text-white" onChange={handleChange} title={""} placeholder={loaded?"Let our AI know your interests!":"Fetching AI responses..."} disabled={!loaded}/>
                        <button type="submit" className="bg-blue-800 hover:bg-blue-900 rounded-md border-opacity-0 p-2 m-2">Send</button>
                    </form>
            </footer>
        </div>
    </>
    )
}