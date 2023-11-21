import Link from "next/link";

export default function RcmdLinkedCard(content){
    const {city, attraction, linkUrl, bgUrl} = content;

    return <>
        <Link href={linkUrl} style={{'--image-url': `url(${bgUrl})`}} className="shrink-0 border rounded w-[60vh] h-[27vh] overflow-hidden transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400 bg-cover bg-[image:var(--image-url)]">
            <div className="flex flex-wrap flex-col h-full w-full backdrop-blur-sm items-start justify-center">
                <h1 className="px-6 font-bold text-2xl text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{city}</h1>
                <h4 className="px-6 font-bold text-md text-gray-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{attraction}</h4>
            </div>
        </Link>
    </>
}