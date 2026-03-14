'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import Link from 'next/link'

type Booking = {
  id: number
  student_name: string
  student_email: string
  student_phone: string
  date: string
  start_time: string
  end_time: string
  status: string
  age_group: string,
  service_type: string, 
  created_at: string

}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('date', { ascending: true })

    if (data) setBookings(data)
    setLoading(false)
  }

  async function updateStatus(id: number, status: string) {
    await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)

    fetchBookings()
  }

  function getStatusColor(status: string) {
    if (status === 'confirmed') return 'bg-green-100 text-green-700'
    if (status === 'cancelled') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  function getStatusLabel(status: string) {
    if (status === 'confirmed') return 'Confirmado'
    if (status === 'cancelled') return 'Cancelado'
    return 'Pendente'
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">Thamy Tennis Admin</span>
          <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-green-600 transition">
            ← Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Marcações</h1>

        {loading ? (
          <p className="text-gray-500">A carregar...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">Não há marcações ainda.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-gray-900">{booking.student_name}</h2>
                    <p className="text-sm text-gray-500">{booking.student_email} · {booking.student_phone}</p>
                    <p className='text-sm'>Faixa Etária: <span className='text-gray-500'>{booking.age_group}</span></p> 
                    <p className='text-sm'>Formato: <span className='text-gray-500'>{booking.service_type}</span></p> 
                    <p className="text-sm text-gray-700 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <svg className="text-[#52B788]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        {booking.date}
                      </span>
                      ·
                      <span className="flex items-center gap-1">
                        <svg className="text-[#52B788]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 3" />
                        </svg>
                        {booking.start_time} - {booking.end_time}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>

                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, 'cancelled')}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                        >
                          Recusar
                        </button>
                      </>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

