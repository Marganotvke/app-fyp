'use client'
import { useState } from "react";
import StyledButtonPlain from "@/app/_mainStyleComponent/StyledButtons";
import { revalidatePath } from "next/cache";

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
        <label className="block m-2 text-xl font-light">Your current location</label>
        <select id="regions" className="flex border rounded-lg p-2 mx-2 bg-slate-900" onChange={(e) => {setLocUsrLoc(Number(e.target.value))}}>
            {locUsrLoc != null ? <option defaultValue={`${locUsrLoc}`} hidden>{locUsrLoc===0? "Hong Kong": "Taiwan"}</option> : <option defaultValue disabled hidden>Choose a region</option>}
            <option value='0'>Hong Kong</option>
            <option value="1">Taiwan</option>
        </select>
        <StyledButtonPlain onClick={()=>{handleSave(locUsrLoc); handleSaveTime(); revalidatePath('/profile/[slug]', 'page')}}>Save</StyledButtonPlain>
        {saved ? <h1>Preference Saved!</h1> : null}
    </>
}