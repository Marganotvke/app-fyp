import Link from "next/link"

export default function Page(){
  return <>
    <div className="container mx-auto w-full bg-center bg-[url(https://media.cnn.com/api/v1/images/stellar/prod/180719135251-beautiful-taiwan-popumon-elephant-hill.jpg?q=w_1600,h_900,x_0,y_0,c_fill/h_618)]">
      <div className="backdrop-blur-sm flex p-48 justify-center text-center text-4xl">
        <h1>I go to school by bus</h1>
      </div>
    </div>
    <header className="text-2xl">
        You are at home
    </header>
  </>
}
