'use client'

import { StrictMode, useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import Link from 'next/link'

type Availability = {
  id: number
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
}

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

export default function SchedulePage() {
  const [availability, setAvailability] = useState<Availability[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    day_of_week: '0',
    start_time: '',
    end_time: '',
  })

  useEffect(() => {
    fetchAvailability()
  }, [])

  async function fetchAvailability() {
    const { data } = await supabase
      .from('availability')
      .select('*')
      .order('day_of_week', { ascending: true })

    if (data) setAvailability(data)
    setLoading(false)
  }

  async function handleAdd() {
    if (!form.start_time || !form.end_time) return

    await supabase.from('availability').insert({
      day_of_week: parseInt(form.day_of_week),
      start_time: form.start_time,
      end_time: form.end_time,
      is_active: true,
    })

    setForm({ day_of_week: '0', start_time: '', end_time: '' })
    fetchAvailability()
  }

  async function toggleActive(id: number, current: boolean) {
    await supabase
      .from('availability')
      .update({ is_active: !current })
      .eq('id', id)

    fetchAvailability()
  }

  async function handleDelete(id: number) {
    await supabase
      .from('availability')
      .delete()
      .eq('id', id)

    fetchAvailability()
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
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Horários Disponíveis</h1>

        {/* Formulário para adicionar horário */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Adicionar Horário</h2>
          <div className="flex flex-col md:flex-row gap-4">
            
            <select
              value={form.day_of_week}
              onChange={(e) => setForm({ ...form, day_of_week: e.target.value })}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 flex-1"
            >
              {DAYS.map((day, index) => (
                <option key={index} value={index}>{day}</option>
              ))}
            </select>

            <input
              type="time"
              value={form.start_time}
              onChange={(e) => setForm({ ...form, start_time: e.target.value })}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 flex-1"
            />

            <input
              type="time"
              value={form.end_time}
              onChange={(e) => setForm({ ...form, end_time: e.target.value })}
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 flex-1"
            />

            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Lista de horários */}
        {loading ? (
          <p className="text-gray-500">A carregar...</p>
        ) : availability.length === 0 ? (
          <p className="text-gray-500">Não há horários definidos ainda.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {availability.map((slot) => (
              <div key={slot.id} className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
                
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-gray-900">{DAYS[slot.day_of_week]}</h2>
                  <p className="text-sm text-gray-500">⏰ {slot.start_time} - {slot.end_time}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${slot.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {slot.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                  <button onClick={() => setForm({
                    day_of_week: form.day_of_week,
                    start_time : slot.start_time,
                    end_time : slot.end_time, 
                  })} className='text-sm text-blue-400 hover:text-blue-600 transition'>
                    Copiar
                  </button>

                  <button
                    onClick={() => toggleActive(slot.id, slot.is_active)}
                    className="text-sm text-gray-500 hover:text-green-600 transition"
                  >
                    {slot.is_active ? 'Desativar' : 'Ativar'}
                  </button>

                  <button
                    onClick={() => handleDelete(slot.id)}
                    className="text-sm text-red-400 hover:text-red-600 transition"
                  >
                    Apagar
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}