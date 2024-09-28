'use client'
import { useState } from "react";
import StyledButtonPlain from "@/app/_mainStyleComponent/StyledButtons";

export default function UsrLocSelect({usrLoc, handleSave}){
    const [locUsrLoc, setLocUsrLoc] = useState(Number(usrLoc));
    const [saved, setSaved] = useState(false);

    const handleSaveTime = () => {
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 2000);
    }

    return <>
        <label for="regions" class="block m-2 text-xl font-light">Choose where you would like to go!</label>
        <select id="regions" class="flex border rounded-lg p-2 mx-2 bg-slate-900" onChange={(e) => {setLocUsrLoc(Number(e.target.value))}}>
            {locUsrLoc != null ? <option selected={locUsrLoc} disabled hidden>{locUsrLoc===0? "Hong Kong": "Taiwan"}</option> : <option selected disabled hidden>Choose a region</option>}
            <option value='0'>Hong Kong</option>
            <option value="1">Taiwan</option>
        </select>
        <StyledButtonPlain onClick={()=>{handleSave(locUsrLoc); handleSaveTime()}}>Save</StyledButtonPlain>
        {saved ? <h1>Preference Saved!</h1> : null}
    </>
}