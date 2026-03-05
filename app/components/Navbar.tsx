'use client'

import { useState } from "react"
import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion"

const links = [
    {href: '#sobre', label: 'Sobre'},
    {href: '#servicos', label: 'Serviços'},
    {href: '#contacto', label: 'Contacto'},
]

export default function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false)

    return(
        <nav className="w-full bg-[#1B4332] z-50 fixed top-0 left-0">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                <Link href="/">
                    <span className="text-xl font-bold text-white">
                        Thamyrys <span className="text-[#52B788]">Araujo</span>
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) =>(
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative text-white/70 hover:text-white transition-all duration-300 group text-sm font-medium">
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#52B788] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                <Link 
                href="/booking"
                className="border border-white text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-[#1B4332] transition-all duration-300"
                >
                    Marcar Treino
                </Link>
                </div>
                <button 
                className="md:hidden text-white z-50"
                onClick={() => setMenuOpen(!menuOpen)}
                >   
                    {menuOpen ? (
                        <span className="text-2xl">x</span>
                    ) : (
                        <span className="text-2xl">☰</span>
                    )}
                </button>
            </div>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0}}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{opacity: 0, height: 0}} 
                        transition={{duration: 0.3}}
                        className="md:hidden bg-[#163a2b] border-t border-white/10 overflow-hidden"          
                    >
                        <div className="px-6 py-6 flex flex-col gap-1">
                            {links.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20}}
                                    animate={{ opacity:1, x:0}}
                                    transition={{delay: index * 0.1}}
                                >
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-3 text-white/80 hover:text-white transition text-lg border-b border-white/10 last:border-0"
                                >
                                    {link.label}
                                </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x:-20}}
                                animate={{ opacity: 1, x: 0}}
                                transition={{ delay: links.length *0.1 }}
                                className="mt-4"
                            >
                                <Link
                                    href="/booking"
                                    onClick={() => setMenuOpen(false)}
                                    className="block border border-white text-white px-5 py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-[#1B4332] transition"
                                >
                                    Marcar Treino →
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}