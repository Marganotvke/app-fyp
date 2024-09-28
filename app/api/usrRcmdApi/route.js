import { supabase } from '@/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST'){
        const { id } = req.query;
        try {
            const { data, error } = await supabase
                .from('user_info')
                .select('location,recommend')
                .eq('id', id)
            
            if (data && data.length > 0){
                res.status(200).json(
                    {
                        message: `Reachable for User: ${id}`,
                        data: data 
                    }
                );
            }else{
                res.status(500).json({ message: `Internal server error` });
            }
        }catch (error){
            res.status(500).json({ message: 'Internal server error' });
        }
    }else{
        res.status(405).json({ message: 'Method not allowed' });
    }
}