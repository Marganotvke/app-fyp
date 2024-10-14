import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { use } from "react";
import ChatLogger from "./_chatComponent/chatLogger";

export default function Chat(){
    const session = use(getServerSession(authOptions));
    
    if (!session || session.status === "unauthenticated") {redirect("/login"); return null;}

    return <>
        <ChatLogger session={session}/>
    </>
}