'use client'

function fetchLocal({ key }){
    const localData = localStorage.getItem(key);
    if (localData && localData.length > 0){
        return localData;
    }else{
        return -1;
    }
}