import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from '@/supabaseClient';

export const authOptions = {
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    jwt: {
        secret: process.env.JWT_SECRET,
    },
    secret: process.env.JWT_SECRET,

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
            async authorize(credentials, req) {
                const { data, error } = await supabase
                    .from('users')
                    .select()
                    .eq('email', credentials.email)
                    .limit(1)

                if (data && data.length > 0){
                    if (data[0].password === credentials.password){
                        return {
                            name: data[0].username,
                            email: data[0].email,
                            id: data[0].id,
                            image: data[0].image,
                        }
                    }
                }
                return null;
            },
        }),
    ],

    // callbacks: {
    //     session({ session, user }) {
    //         if (session.user && user) {
    //             session.user.id = user.id
    //             session.user.mobile = user.mobile
    //         }
    //         return session
    //     } 
    // }

};

const handler=NextAuth(authOptions)

export {handler as GET , handler as POST}
