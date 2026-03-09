'use server'

import { supabaseAdmin } from "../lib/supabase-server"

export async function createBooking(data: {
    student_name: string
    student_email: string
    student_phone: string
    date: string
    start_time: string
    end_time: string
    service_type: string
    age_group: string
    notes: string
}) {
    const { error } = await supabaseAdmin.from('bookings').insert({
        ...data,
        status: 'pending',
    })
    
    if(error){
        return { success: false, error: error.message }
    }

    return { success : true}
}