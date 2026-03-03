'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import Navbar from '@/app/components/Navbar'

export default function BookingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    student_name: '',
    student_email: '',
    student_phone: '',
    date: '',
    start_time: '',
    end_time: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')

    // Validação básica
    if (!form.student_name || !form.student_email || !form.student_phone || !form.date || !form.start_time || !form.end_time) {
      setError('Por favor preenche todos os campos.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('bookings').insert({
      student_name: form.student_name,
      student_email: form.student_email,
      student_phone: form.student_phone,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
      status: 'pending',
    })


    if (error) {
      setError('Erro ao enviar marcação. Tenta novamente.')
      setLoading(false)
      return
    }

    router.push('/confirmation')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="max-w-lg mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marcar Treino</h1>
          <p className="text-gray-500 mb-8">Preenche o formulário e a treinadora irá confirmar a tua marcação.</p>

          <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-5">

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                name="student_name"
                value={form.student_name}
                onChange={handleChange}
                placeholder="O teu nome"
                className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="student_email"
                value={form.student_email}
                onChange={handleChange}
                placeholder="O teu email"
                className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="tel"
                name="student_phone"
                value={form.student_phone}
                onChange={handleChange}
                placeholder="O teu telefone"
                className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Data</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-700">Hora início</label>
                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-700">Hora fim</label>
                <input
                  type="time"
                  name="end_time"
                  value={form.end_time}
                  onChange={handleChange}
                  className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'A enviar...' : 'Enviar Pedido'}
            </button>

          </div>
        </div>
      </main>
    </>
  )
}