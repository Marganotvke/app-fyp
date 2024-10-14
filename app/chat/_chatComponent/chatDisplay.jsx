"use client"
import { useState, useRef } from "react";

export default function ChatDisplay({handleResponse, loaded}) {
    const ref = useRef(null);
    const [chat, setChat] = useState("");

    const handleChange = (e) => {
        setChat(e.target.value);
    }

    return (
    <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-[10%] w-full bg-slate-700 justify-center z-10 absolute bottom-0 flex-col">
            <form ref={ref} onSubmit={(e)=>{handleResponse(e,chat); ref.current?.reset()} }>
                <input type="text" id="response" name="response" required className="w-[90%] m-2 p-2 border rounded-md bg-slate-800 text-white" onChange={handleChange} placeholder="Let our AI know your interests!" disabled={!loaded}/>
                <button type="submit" className="bg-blue-800 hover:bg-blue-900 rounded-md border-opacity-0 p-2 m-2">Send</button>
            </form>
        </div>
    </div>
    )
}