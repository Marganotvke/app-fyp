'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import isEmail from "is-email";


export default function SignUp( callbacks ){
  const router = useRouter();
  const [warning, setWarning] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    image: null,
  })

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    if(formValues.password !== formValues.passwordConfirm || !isEmail(formValues.email) || formValues.username === ''){
      setWarning(true);
      return;
    }

    const {error} = await supabase
      .from('users')
      .insert({"username": formValues.username, "email": formValues.email, "password": formValues.password, "image": formValues.image})
    
    if(error){
      setWarning(true);
    }else{
      setWarning(false);
      router.replace('/login')
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
          <form onSubmit={onSubmitSignUp}>
            <div className="flex flex-col gap-8 justify-center items-center">
              <h2 className="text-2xl text-white font-bold">Welcome to FYP</h2>
              {warning? <h4 className="text-white">Please try again.</h4>: null}
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="account">Email</label>
                <input className={warning? `border-4 border-red-600 rounded-md p-2 text-black font-light`: `border rounded-md p-2 text-black font-light`} type="text" id="email" name="email" onChange={handleChange} required/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="username">Username</label>
                <input className={warning? `border-4 border-red-600 rounded-md p-2 text-black font-light`: `border rounded-md p-2 text-black font-light`} type="text" id="username" name="username" onChange={handleChange} required/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="password">Password</label>
                <input className={warning? `border-4 border-red-600 rounded-md p-2 text-black font-light`: `border rounded-md p-2 text-black font-light`} type="password" id="password" name="password" onChange={handleChange} required/>
              </div>
              <div className="flex flex-col gap-2 -mt-6">
                <label className="text-white" htmlFor="password">Confirm Password</label>
                <input className={warning? `border-4 border-red-600 rounded-md p-2 text-black font-light`: `border rounded-md p-2 text-black font-light`} type="password" id="passwordConfirm" name="passwordConfirm" onChange={handleChange} required/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white" htmlFor="image">Image (Url)</label>
                <input className={warning? `border-4 border-red-600 rounded-md p-2 text-black font-light`: `border rounded-md p-2 text-black font-light`} type="text" id="image" name="image" onChange={handleChange} />
              </div>
              <div className="flex w-full gap-10 justify-center items-center">
                <button type="submit" className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-5 rounded">
                  Sign Up Now!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}
  