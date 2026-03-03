'use client'

import { useState } from "react"
import Link from 'next/link'

export default function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false)

    return(
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

            <Link href="/" className="text-2xl font-bold text-green-600">
                Thamy Tennis
            </Link>

            <div className="hidden md:flex items-center gap-8">
                <Link href="#sobre" className="text-gray-600 hover:text-green-600 transition">
                    Sobre
                </Link>
                <Link href="#servicos" className="text-gray-600 hover:text-green-600 transition">
                    Serviços
                </Link>
                <Link href="#contacto" className="text-gray-600 hover:text-green-600 transition">
                    Contacto
                </Link>
                <Link
                    href="/booking"
                    className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition"
                >
                Marcar Treino
                </Link>
            </div>
            <button 
                className="md:hidden text-gray-600"
                onClick={() => setMenuOpen(!menuOpen)}    
            >
                { menuOpen ? 'x' : '☰'}
            </button>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-white px-6 pb-6 flex flex-col gap-4 border-t">
                    <Link href="#sobre" className="text-gray-600 hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>
                        Sobre
                    </Link>
                    <Link href="#servicos" className="text-gray-600 hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>
                        Serviços
                    </Link>
                    <Link href="#contacto" className="text-gray-600 hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>
                        Contacto
                    </Link>
                    <Link
                        href="/booking"
                        className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold text-center hover:bg-green-700 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                    Marcar Treino
                    </Link>
                </div>
            )}
            
        </nav>
    )
}