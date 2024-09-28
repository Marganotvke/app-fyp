'use client'
import { useState, useEffect } from "react"

export default function HomeBanner({ children }){
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        
        setLoaded(true);    
    },[])

    return <>
        <div className={`scroll-smooth transition-all ease-in duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
            <div className={`flex flex-wrap w-full bg-center bg-cover bg-[url(https://media.cnn.com/api/v1/images/stellar/prod/180719135251-beautiful-taiwan-popumon-elephant-hill.jpg?q=w_1600,h_900,x_0,y_0,c_fill/h_618)] ${loaded? `transition-all ease-in-out h-[calc(100vh-3.75rem)] duration-700 translate-y-0 opacity-100`: "h-0 translate-y-[calc(50vh)]"}`}>
                <div className="backdrop-blur-sm w-full">
                    <h1 className="mt-[calc((100vh-3.75rem)/2-3rem)] text-center text-5xl font-sans font-light">Why not explore more of this world?</h1>
                </div>
            </div>
            {children}
        </div>
    </>
}
