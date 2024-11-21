import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { use } from "react";
import ChatInterface from "./_chatComponent/chatInterface";

export default function Chat(){
    const session = use(getServerSession(authOptions));
    
    if (!session || session.status === "unauthenticated") {redirect("/login"); return null;}

    return <div className="min-h-[calc(100%-3.5rem)] h-full">
        <ChatInterface session={session}/>
    </div>
}