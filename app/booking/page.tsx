'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import Navbar from '@/app/components/Navbar'
import { createBooking } from '../actions/booking'

type Availability = {
  id: number
  day_of_week: number
  start_time: string
  end_time: string
}

export default function BookingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [slots, setSlots] = useState<Availability[]>([])
  const [selectedSlot, setSelectedSlot] = useState<Availability | null>(null)

  const [form, setForm] = useState({
    student_name: '',
    student_email: '',
    student_phone: '',
    date: '',
    service_type: '',
    age_group: '', 
    notes: '', 
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!form.date) return

    const dayOfWeek = new Date(form.date).getDay()
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1

    fetchSlots(adjustedDay)
    setSelectedSlot(null)
  }, [form.date])

  async function fetchSlots(dayOfWeek: number) {
    const { data } = await supabase
      .from('availability')
      .select('*')
      .eq('day_of_week', dayOfWeek)
      .eq('is_active', true)

    if (data) setSlots(data)
    else setSlots([])
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')

    if (!form.student_name || !form.student_email || !form.student_phone || !form.date || !form.age_group || !form.service_type || !selectedSlot) {
      setError('Por favor preenche todos os campos.')
      setLoading(false)
      return
    }

    const result = await createBooking({
      student_name: form.student_name,
      student_email: form.student_email,
      student_phone: form.student_phone,
      date: form.date,
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
      service_type: form.service_type,
      age_group: form.age_group,
      notes: form.notes,
    })


    if(!result.success){
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

            {/* Horários disponíveis */}
            {form.date && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Horário disponível</label>
                {slots.length === 0 ? (
                  <p className="text-sm text-red-400">Não há horários disponíveis para este dia.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`border rounded-lg p-3 text-left transition ${selectedSlot?.id === slot.id ? 'border-green-500 bg-green-50 text-green-700' : 'hover:border-green-300'}`}
                      >
                        ⏰ {slot.start_time} - {slot.end_time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

         
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Faixa Etária</label>
            <select 
                name="age_group"
                value={form.age_group}
                onChange={(e) => setForm({ ...form, age_group: e.target.value})}
                className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione a faixa etária</option>
              <option value="Criança">Crianças (até 12 anos)</option>
              <option value="Adolescentes">Adolescentes (13-17 anos)</option>
              <option value="Adultos">Adultos (18+ anos)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Formato</label>
            <select 
                name="service_type"
                value={form.service_type}
                onChange={(e) => setForm({ ...form, service_type: e.target.value})}
                className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione o formato</option>
              <option value="Individual">Individual</option>
              <option value="Grupo">Grupo</option>
            </select>
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