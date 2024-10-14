'use client'
import Link from "next/link";
import {useEffect, useState} from "react"
import LoadThrobber from "../_mainComponent/loadThrobber";

export default function Catalog(){
  // const [loaded, setLoaded] = useState(false);

  // useEffect(()=>{
  //   setLoaded(true);
  // },[])

  // if (!loaded) {
  //   return <LoadThrobber />
  // }

  return <>
    <div className="flex h-[calc(100vh-3.75rem)] flex-wrap flex-col">
      <Link href="/catalogue/hongkong" className={`flex flex-grow m-[5vh] mr-[35vw] rounded-2xl bg-cover bg-[url(https://images.pexels.com/photos/2300342/pexels-photo-2300342.jpeg)] transition-transform ease-linear duration-75 hover:translate-x-6 hover:shadow-lg hover:shadow-gray-400`}>
        <div className="flex border rounded-xl h-full w-full backdrop-blur-sm justify-start items-center">
          <h1 className="px-6 font-bold text-4xl">Hong Kong</h1>
        </div>
      </Link>
      <Link href="/catalogue/taiwan" className="flex flex-grow m-[5vh] ml-[35vw] rounded-2xl bg-cover bg-[url(https://images.pexels.com/photos/2928796/pexels-photo-2928796.jpeg)] transition-transform ease-linear duration-75 hover:-translate-x-6 hover:shadow-lg hover:shadow-gray-400">
        <div className="flex border rounded-xl h-full w-full backdrop-blur-sm justify-end items-center">
          <h1 className="px-6 font-bold text-4xl">Taiwan</h1>
        </div>
      </Link>
    </div>
  </>
}
