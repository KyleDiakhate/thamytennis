'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/app/lib/supabase'
import { createBooking } from '@/app/actions/booking'

type Availability = {
  id: number
  day_of_week: number
  start_time: string
  end_time: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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

  function handleClose() {
    setForm({ student_name: '', student_email: '', student_phone: '', date: '', service_type: '', age_group: '', notes: '' })
    setSelectedSlot(null)
    setError('')
    setSuccess(false)
    setSlots([])
    onClose()
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

    if (!result.success) {
      setError('Erro ao enviar marcação. Tenta novamente.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-[5%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#1B4332]">Marcar Treino</h2>
                  <p className="text-[#1B4332]/50 text-sm mt-1">Preenche o formulário e entraremos em contacto.</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-[#1B4332]/40 hover:text-[#1B4332] transition text-2xl font-light"
                >
                  ✕
                </button>
              </div>

              {/* Sucesso */}
              {success ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎾</div>
                  <h3 className="text-xl font-extrabold text-[#1B4332] mb-2">Pedido Enviado!</h3>
                  <p className="text-[#1B4332]/60 text-sm leading-relaxed mb-6">
                    O teu pedido foi enviado à treinadora. Serás contactado em breve para confirmação.
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-[#52B788] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d9e6e] transition"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#1B4332]">Nome</label>
                    <input
                      type="text"
                      name="student_name"
                      value={form.student_name}
                      onChange={handleChange}
                      placeholder="O teu nome"
                      className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#52B788] text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#1B4332]">Email</label>
                    <input
                      type="email"
                      name="student_email"
                      value={form.student_email}
                      onChange={handleChange}
                      placeholder="O teu email"
                      className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#52B788] text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#1B4332]">Telefone</label>
                    <input
                      type="tel"
                      name="student_phone"
                      value={form.student_phone}
                      onChange={handleChange}
                      placeholder="O teu telefone"
                      className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#52B788] text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#1B4332]">Data</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#52B788] text-sm"
                    />
                  </div>

                  {/* Horários */}
                  {form.date && (
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-[#1B4332]">Horário disponível</label>
                      {slots.length === 0 ? (
                        <p className="text-sm text-red-400">Não há horários disponíveis para este dia.</p>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {slots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot)}
                              className={`border rounded-lg p-3 text-left text-sm transition ${selectedSlot?.id === slot.id ? 'border-[#52B788] bg-[#52B788]/10 text-[#1B4332]' : 'hover:border-[#52B788]/50'}`}
                            >
                              ⏰ {slot.start_time} — {slot.end_time}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#1B4332]">Faixa Etária</label>
                    <select
                      name="age_group"
                      value={form.age_group}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#52B788] text-sm"
                    >
                      <option value="">Seleciona a faixa etária</option>
                      <option value="Criança">Crianças (até 12 anos)</option>
                      <option value="Adolescentes">Adolescentes (13-17 anos)</option>
                      <option value="Adultos">Adultos (18+ anos)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#1B4332]">Formato</label>
                    <select
                      name="service_type"
                      value={form.service_type}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#52B788] text-sm"
                    >
                      <option value="">Seleciona o formato</option>
                      <option value="Individual">Individual</option>
                      <option value="Grupo">Grupo</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-[#1B4332]">Notas <span className="text-[#1B4332]/40">(opcional)</span></label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Alguma informação adicional..."
                      rows={3}
                      className="border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#52B788] text-sm resize-none"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-[#52B788] text-white py-3 rounded-lg font-semibold hover:bg-[#3d9e6e] transition disabled:opacity-50 mt-2"
                  >
                    {loading ? 'A enviar...' : 'Enviar Pedido'}
                  </button>

                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}