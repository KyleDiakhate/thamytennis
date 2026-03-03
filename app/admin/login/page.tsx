'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import HomePage from "@/app/components/HomePage"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true)

    function handleClose() {
        setVisible(false)
        setTimeout(() => {
            router.push('/')
        }, 400)
    }

    async function handleLogin() {
        setLoading(true)
        setError('')

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(error) {
            setError('Email ou password incorretos')
            setLoading(false)
            return
        }

        if(data.session) {
            window.location.href = '/admin/dashboard'
        }
    }

    return(
        <>
            {/* Página principal por baixo */}
            <div className="pointer-events-none select-none">
                <HomePage/>
            </div>

            <AnimatePresence>
                {visible && (
                    <>
                        <motion.div
                            key="overlay"
                            className="fixed inset-0 bg-black/40 z-60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                        />

                        <div className="fixed inset-0 z-70 flex items-start justify-center pt-20 px-6">
                            <motion.div
                                key="modal"
                                className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
                                initial={{ y: -80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -80, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <div className="p-8">

                                    <button
                                        onClick={handleClose}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-xl"
                                    >
                                        ✕
                                    </button>

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
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}