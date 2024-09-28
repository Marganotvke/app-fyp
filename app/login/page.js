'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login( callbacks ){
  const router = useRouter();
  const [warning, setWarning] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const {error, status, ok, url} = await signIn('credentials', {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    })
    if (!ok){
      setWarning(true);
    }else{
      router.replace(`/`);
    }
  }

  const handleChange = (e) => {
    setWarning(false);
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value})
  }

  return <>
    <div className="flex flex-wrap h-[calc(100vh-3.75rem)] mx-auto w-full justify-center bg-center bg-cover bg-[url(https://i.natgeofe.com/n/cb873b6f-18ff-4647-8dc0-82b62e9d5849/hong-kong-travel_16x9.jpg)]">
      <div className="flex flex-wrap w-full backdrop-blur-sm items-center justify-center">
        <div className="flex border rounded-xl px-12 py-5 bg-slate-800 items-center justify-center">
          <form onSubmit={onSubmitLogin}>
            <div className="flex flex-col gap-8 justify-center items-center">
              <h2 className="text-2xl text-white font-bold">Welcome to FYP</h2>
              {warning? <h4 className="text-red-500">Please try again.</h4>: null}
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="account">Email</label>
                <input className={warning? `border-4 border-red-600 rounded-md p-2 text-black font-light`: `border rounded-md p-2 text-black font-light`} type="text" id="email" name="email" onChange={handleChange} required/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="password">Password</label>
                <input className={warning? `border-4 border-red-600 rounded-md p-2 text-black font-light`: `border rounded-md p-2 text-black font-light`} type="password" id="password" name="password" onChange={handleChange} required/>
              </div>
              <div className="flex w-full gap-10">
                <button type="submit" className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-5 rounded">
                  Login
                </button>
                <Link href="/signup" className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-5 rounded">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}
  