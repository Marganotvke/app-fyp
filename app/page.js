'use client'
import { useState, useEffect } from "react"

export default function Page(){
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true);

  },[])

  return <>
    <div className={`flex flex-wrap w-full bg-center bg-cover bg-[url(https://media.cnn.com/api/v1/images/stellar/prod/180719135251-beautiful-taiwan-popumon-elephant-hill.jpg?q=w_1600,h_900,x_0,y_0,c_fill/h_618)] ${loaded? "transition-all ease-in-out h-[calc(100vh-3.75rem)] duration-700 translate-y-0 opacity-100": "h-0 translate-y-[50vh] opacity-0"}`}>
      <div className="backdrop-blur-sm w-full">
        <h1 className="mt-[calc((100vh-3.75rem)/2-3rem)] text-center text-5xl font-sans font-light">Explorer the beauty of the world.</h1>
      </div>
    </div>
  </>
}
