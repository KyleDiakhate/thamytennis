'use client'

import { useState } from "react"
import Navbar from "./Navbar"
import Hero from "./Hero"
import Footer from "./Footer"
import About from "./About"
import Service from "./Services"
import Contact from "./Contact"
import BookingModal from "./BookingModal"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <main>
      <Navbar onBooking={() => setModalOpen(true)} />
      <Hero  onBooking={() => setModalOpen(true)}/>
      <About />
      <Service onBooking={() => setModalOpen(true)} />
      <Contact />
      <Footer />
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}