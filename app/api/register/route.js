import { supabase } from '@/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { formValues } = await req.json();
    try {
        const {error} = await supabase
            .from('users')
            .insert({"username": formValues.username, "email": formValues.email, "password": formValues.password, "image": formValues.image})
        
        if (error){
            console.log(error);
            return NextResponse.json({ message: `Internal server error`}, {error: error}, {status: 500} );
        }else{
            return NextResponse.json({ message: "Registered" }, { status: 201 });
        }
    }catch (error){
        console.log(error);
        return NextResponse.json({ message: `Internal server error`}, {error: error}, {status: 500} );
    }
}
