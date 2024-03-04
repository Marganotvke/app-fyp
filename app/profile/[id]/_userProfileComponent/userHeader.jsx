'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserHeader( children ){
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log("current user:", session);
    }, [session]);

    return (
        <div className="flex flex-wrap flex-row items-start justify-between bg-cover bg-center bg-[url(https://images.pexels.com/photos/981147/pexels-photo-981147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
            <div className="flex w-full h-full backdrop-blur-sm">
            {session&&session.user.image? <img className="rounded-full p-2 w-[5rem] h-[5rem]" src={session.user.image}></img>: null}
                <h1 className="text-4xl px-2 py-5 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Welcome, {session? session.user.name: null}! </h1>
            </div>
        </div>
    )
}