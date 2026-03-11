import Image from 'next/image'

type Props = {
    onBooking : () => void
}

export default function Hero({ onBooking }: Props) {
  return (
    <section className="bg-[#1B4332] min-h-[85vh] relative overflow-hidden pt-16">

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L1440 120L1440 60C1200 120 240 0 0 60L0 120Z" fill="#f0f7f4"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 relative z-10">

        <div className="flex-1">
          <p className="text-[#52B788] font-semibold text-sm uppercase tracking-widest mb-4">
            Treinadora Profissional 
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Treina Ténis, <br />
            Eleva o teu jogo <span className="text-[#52B788] underline">Hoje</span>
          </h1>
          <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
            Aulas personalizadas para todos os niveis.
          </p>
          <button
            onClick={onBooking}
            className="inline-flex items-center gap-2 bg-[#52B788] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#3d9e6e] transition-all duration-300 hover:gap-4"
          >
            Marcar treino <span>→</span>
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center hidden md:flex">
          <div className="relative w-[220px] h-[320px] group  transition-transform duration-500 hover:scale-105">
            <div className="absolute top-3 left-3 w-[280px] h-[400px] border-2 border-[#52B788] rounded-2xl" />
            <div className="absolute top-0 left-0 w-[280px] h-[400px] rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl ">
              <Image
                src="/IMG_8211.jpeg"
                alt="Thamyrys"
                quality={100}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}