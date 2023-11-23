import { supabase } from "@/supabaseClient";
import { use } from "react";
import attrCard from "../_catComponent/clickCard";

// async function fetchPlaces(){
//     const {data, error} = await supabase
//         .from('places')
//         .select()
  
//     if (data && data.length > 0){
//       return data;
//     }else{
//       return error;
//     }
//   }

export default function Page(){
    // const data = use(fetchPlaces());

    return <>
        <div className="h-full columns-2 gap-0 p-5 mx-5">
            <div className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400">
                <h1 className="text-2xl">Lorem Ipsum</h1>
                <h2 className="mt-2 text-xl">Lorem</h2>
                <h4 className="mt-2 text-md font-light">Lorem sit enim esse esse laborum esse qui sint. Sit voluptate qui do non aliqua commodo consectetur aliquip officia. Laborum nisi labore aliquip adipisicing veniam Lorem anim. Pariatur ut voluptate culpa occaecat pariatur esse id eiusmod nulla. Reprehenderit Lorem occaecat enim commodo officia consectetur mollit.</h4>
                <div className="flex w-full items-center justify-end">
                    <button className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Pick a date</button>
                </div>
            </div>
            <div className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400">
                <h1 className="text-2xl">Ipsum Lorem</h1>
                <h2 className="mt-2 text-xl">Ipsum</h2>
                <h4 className="mt-2 text-md font-light">In fugiat cupidatat dolore laboris. Incididunt eiusmod sit magna deserunt non ad laborum aute veniam irure excepteur fugiat. Reprehenderit nostrud velit eu minim magna reprehenderit incididunt anim elit sit elit ex id. Fugiat duis nisi minim excepteur ad cupidatat tempor minim aliqua reprehenderit sint commodo ad. Aute exercitation ea dolor id in aliqua ea ullamco. Irure laboris cillum eu ex quis.</h4>
                <div className="flex w-full items-center justify-end">
                    <button className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Pick a date</button>
                </div>
            </div>
            <div className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400">
                <h1 className="text-2xl">Lorem Ipsum Sugonese</h1>
                <h2 className="mt-2 text-xl">Sawcon</h2>
                <h4 className="mt-2 text-md font-light">Qui veniam et amet anim sint irure officia eu pariatur. Deserunt voluptate ullamco ea officia eiusmod proident est nisi. Laboris duis dolor ea excepteur veniam exercitation tempor adipisicing ad elit. Sit aliquip ut qui exercitation cupidatat amet id exercitation et fugiat nulla ad culpa. Magna esse aliquip occaecat officia cupidatat consectetur ad in esse sit magna deserunt eu.</h4>
                <div className="flex w-full items-center justify-end">
                    <button className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Pick a date</button>
                </div>
            </div>
            <div className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400">
                <h1 className="text-2xl">Ex Mollit Nisi Cupidatat</h1>
                <h2 className="mt-2 text-xl">Sawcon</h2>
                <h4 className="mt-2 text-md font-light">Fugiat laborum laboris minim est occaecat enim do et cillum quis nostrud sit anim. Nostrud incididunt occaecat sit excepteur. Reprehenderit sunt est incididunt minim proident cupidatat Lorem qui laborum ipsum ea excepteur aute. Eu cupidatat aute pariatur aute velit voluptate esse.</h4>
                <div className="flex w-full items-center justify-end">
                    <button className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Pick a date</button>
                </div>
            </div>
        </div>
    </>
}