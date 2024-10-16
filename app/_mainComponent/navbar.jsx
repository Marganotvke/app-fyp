'use client'
import Link from 'next/link'
import { signIn, signOut, useSession  } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Navbar() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleLogin = () => {
        if (status==="authenticated") {
            router.replace("/");
            signOut();
        } else {
            signIn()
        }
    }

    // useEffect(()=>{
    //     console.log(session);
    // },[session])

    return (
        <nav className='sticky top-0 z-10 flex items-center justify-between bg-slate-400 p-2 backdrop-blur-sm bg-opacity-70'>
            <div className='flex items-center flex-shrink-0 mr-6 text-3xl p-1'>
                <Link href="/">FYP</Link>
            </div>
            <div className='flex flex-row gap-5 items-center text-xl justify-center'>
                <Link href="/catalogue" className='hover:border-b'>Catalogue</Link>
                <Link href="/chat" className='hover:border-b'>Chat</Link>
            </div>
            <div className='flex flex-row gap-5 items-center justify-center'>
                {status==="authenticated" ? <button onClick={() => router.replace(`/profile/${session.user.name}`)} className='underline hover:text-gray-300'>Schedule</button> : null}
                <button onClick={() => handleLogin()} className='block border rounded border-gray-400 px-3 py-2 hover:bg-gray-400 hover:text-gray-600'>
                    {status==="authenticated" ? 'Sign Out' : 'Start Planning'}
                </button>
            </div>
        </nav>
    )
}

