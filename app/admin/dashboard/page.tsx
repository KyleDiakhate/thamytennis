'use client'

import { supabase } from '@/app/lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {

    async function handleLogout() {
        await supabase.auth.signOut()
        window.location.href = '/' 
    }
  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">Thamy Tennis Admin</span>
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500 transition">
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link href="/admin/booking" className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">📋</div>
            <h2 className="text-lg font-semibold text-gray-900">Marcações</h2>
            <p className="text-gray-500 text-sm mt-1">Ver e gerir os pedidos de marcação</p>
          </Link>

          <Link href="/admin/schedule" className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">📅</div>
            <h2 className="text-lg font-semibold text-gray-900">Horários</h2>
            <p className="text-gray-500 text-sm mt-1">Gerir os horários disponíveis</p>
          </Link>

          <div className="bg-green-50 rounded-2xl shadow-sm p-6">
            <div className="text-3xl mb-3">🎾</div>
            <h2 className="text-lg font-semibold text-gray-900">Bem-vinda!</h2>
            <p className="text-gray-500 text-sm mt-1">Painel de gestão de treinos</p>
          </div>

        </div>
      </div>
    </main>
  )
}