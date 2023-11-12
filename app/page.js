'use client'
import { useState, useEffect } from "react"
import Link from "next/link";

export default function Page(){
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {

    setLoaded(true);
  },[])

  return <>
    <div className={`transition-all ease-in-out duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
      <div className={`flex flex-wrap w-full bg-center bg-cover bg-[url(https://media.cnn.com/api/v1/images/stellar/prod/180719135251-beautiful-taiwan-popumon-elephant-hill.jpg?q=w_1600,h_900,x_0,y_0,c_fill/h_618)] ${loaded? `transition-all ease-in-out h-[calc(100vh-3.75rem)] duration-700 translate-y-0 opacity-100`: "h-0 translate-y-[calc(50vh)]"}`}>
        <div className="backdrop-blur-sm w-full">
          <h1 className="mt-[calc((100vh-3.75rem)/2-3rem)] text-center text-5xl font-sans font-light">Explore the beauty of the world.</h1>
        </div>
      </div>
      <div className="flex flex-wrap flex-col p-6 gap-5">
        <h1 className="text-3xl font-sans font-light">Discover New Oppotunities.</h1>
        <hr class="h-px -my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex flex-row flex-grow w-full max-w-screen h-[30vh] overflow-x-auto gap-5 items-center scrollbar-hide scroll-smooth">
          <Link href="#" className="shrink-0 border rounded w-[60vh] h-[27vh] overflow-hidden transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 bg-cover bg-[url(https://scontent.fhkg10-1.fna.fbcdn.net/v/t1.6435-9/103778196_783164975552189_6192297862378149615_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=nZGUiPDvYNAAX-FrFOd&_nc_oc=AQlZk0ZLH-EYYNd9sJSRe1dJhzN_-b46_LJLcXgcfavcDI6aiGwo2czjG75ckeguyUY&_nc_ht=scontent.fhkg10-1.fna&oh=00_AfBBWDTAeVI6CsDlbOsrVXcTq2YfN3b8VwLSwDviJf8teQ&oe=6578985E)]">
            <div className="flex flex-wrap flex-col h-full w-full backdrop-blur-sm items-start justify-center">
              <h1 className="px-6 font-bold text-2xl text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Hualien City</h1>
              <h4 className="px-6 font-bold text-md text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Mountain Space</h4>
            </div>
          </Link>
          <Link href="#" className="shrink-0 border rounded w-[60vh] h-[27vh] overflow-hidden transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 bg-cover bg-[url(https://qqhair.tw/webp/wp-content/uploads/2020/10/P1092459-1.jpg.webp)]">
            <div className="flex flex-wrap flex-col h-full w-full backdrop-blur-sm items-start justify-center">
              <h1 className="px-6 font-bold text-2xl text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Hsinchuhsien</h1>
              <h4 className="px-6 font-bold text-md text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Yunmeng Hill</h4>
            </div>
          </Link>
          <Link href="#" className="shrink-0 border rounded w-[60vh] h-[27vh] overflow-hidden transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 bg-cover bg-[url(https://www2.canon.com.hk/myContent/article/10403/images/image001.jpg)]">
            <div className="flex flex-wrap flex-col h-full w-full backdrop-blur-sm items-start justify-center">
              <h1 className="px-6 font-bold text-2xl text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Kowloon</h1>
              <h4 className="px-6 font-bold text-md text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Lei Yue Mun Stone Quarry</h4>
            </div>
          </Link>
          <Link href="#" className="shrink-0 border rounded w-[60vh] h-[27vh] overflow-hidden transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 bg-cover bg-[url(https://s.yimg.com/ny/api/res/1.2/qTMQi9rO0DusuZzYZj2.Eg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2021-07/ff0423f0-e0a1-11eb-aeeb-c7126c1ebd5e)]">
            <div className="flex flex-wrap flex-col h-full w-full backdrop-blur-sm items-start justify-center">
              <h1 className="px-6 font-bold text-2xl text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">New Territories</h1>
              <h4 className="px-6 font-bold text-md text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Little Palm Beach</h4>
            </div>
          </Link>
          <Link href="#" className="shrink-0 border rounded w-[60vh] h-[27vh] overflow-hidden transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 bg-cover bg-[url(https://s.yimg.com/ny/api/res/1.2/yjVFai65YvUdCjQ2nZ4fEQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MTtjZj13ZWJw/https://media.zenfs.com/en/travelliker_746/999d258cf1110b5ea08e394e968c323c)]">
            <div className="flex flex-wrap flex-col h-full w-full backdrop-blur-sm items-start justify-center">
              <h1 className="px-6 font-bold text-2xl text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Keelung</h1>
              <h4 className="px-6 font-bold text-md text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Wang-yo Valley</h4>
            </div>
          </Link>
          <Link href="#" className="shrink-0 border rounded w-[60vh] h-[27vh] overflow-hidden transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 bg-cover bg-[url(https://s.yimg.com/ny/api/res/1.2/JhlQjXZATDxgVqMy1dt6Mg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYzOTtjZj13ZWJw/https://media.zenfs.com/en/travelliker_746/87cf92f635dfc97334d211dd3a107c09)]">
            <div className="flex flex-wrap flex-col h-full w-full backdrop-blur-sm items-start justify-center">
              <h1 className="px-6 font-bold text-2xl text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Nantou</h1>
              <h4 className="px-6 font-bold text-md text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Nepenthe Forest</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </>
}
