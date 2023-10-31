import React from "react";
import { signIn, useSession } from "next-auth/client";

export default function Page() {
    const [session, loading] = useSession();

    if (loading) {
        return <p>Loading...</p>;
    }

    if(!session){
        signIn();
    }

    return (
        <>
            <header className="text-2xl">
                You are logged in.
            </header>
        </>
    )
}