"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children, pageprops: session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};