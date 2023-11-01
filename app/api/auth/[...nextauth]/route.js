import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

const checkCred = (credentials) => {
    return credentials.email == process.env.NEXTAUTH_EMAIL &&
    credentials.password == process.env.NEXTAUTH_PASSWORD;
}

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                label: "Email",
                type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (checkCred(credentials)) {
                    return true;
                }else{
                    return null;
                }
            },
        }),
    ],
};

const handler=NextAuth(authOptions)

export {handler as GET , handler as POST}
