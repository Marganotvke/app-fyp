"use client"
import { useState } from "react";

export default function LoadTextAnim(){
    const [state, setState] = useState(0);

    const checkBound = () => {
        if(state === 3){
            setState(0);
        }
    }

    const loopState = () => {
        setTimeout(() => {
            setState(state+1);
            checkBound();
            loopState();
        },300);
    }

    return (
        <div>
            <h4 className="font-light text-md mt-2 text-left">Loading{".".repeat(state+1)}</h4>
        </div>
    )
}