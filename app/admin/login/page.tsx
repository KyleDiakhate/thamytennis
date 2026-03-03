'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(error) {
            setError('Email ou password incorretos')
            setLoading(false)
            return
        }
        
        router.push('/admin/dashborad')
    }

    return(
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                     Área da Treinadora
                </h1>

                <div className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                />

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? 'A entrar...' : 'Entrar'}
                    </button>
                </div>
            </div>
        </main>
    )
}