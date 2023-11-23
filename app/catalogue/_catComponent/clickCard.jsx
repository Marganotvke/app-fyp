'use client'

export default function attrCard({ idx, item, cid }){
    return (
        <div key={idx} className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400">
            <h1 className="text-2xl">ASD</h1>
            <h2 className="mt-2 text-xl">asdf</h2>
            <h4 className="mt-2 text-md font-light">Exercitation aliquip id eu cupidatat Lorem veniam excepteur elit voluptate minim proident.</h4>
        </div>
    )
}