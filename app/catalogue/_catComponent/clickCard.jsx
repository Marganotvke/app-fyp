'use client'
import { LoremIpsum } from 'lorem-ipsum';

const loremBody = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
})

const loremTitle = new LoremIpsum({
    sentencesPerParagraph: {
        max: 1,
        min: 1
    },
    wordsPerSentence: {
        max: 6,
        min: 2
    }
})

export default function AttrCard({ idx, item, desFunc, dateFunc }){
    // const {pid, rid, city, attraction, image, brief} = item;
    const pid = 1;
    const rid = 0;
    return (
        <div key={idx} onClick={()=>desFunc(pid, rid)} className="break-inside-avoid-column max-w-full m-6 border rounded-xl p-5 bg-slate-600 transition-transform ease-linear duration-75 hover:translate-y-1 hover:shadow-md hover:shadow-gray-400">
                <h1 className="text-2xl">{loremTitle.generateSentences(1)}</h1>
                <h2 className="mt-2 text-xl">{loremBody.generateWords(1)}</h2>
                <h4 className="mt-2 text-md font-light">{loremBody.generateParagraphs(1)}</h4>
                <div className="flex w-full items-center justify-end">
                    <button onClick={(e)=>dateFunc(e)} className="mt-4 border rounded-md p-1 hover:bg-blue-900 hover:text-gray-200">Pick a date</button>
                </div>
        </div>
    )
}