export default function Contact() {
  return (
    <section id="contacto" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-start justify-between gap-16 flex-wrap">

          {/* Esquerda */}
          <div className="flex-1 min-w-[240px]">
            <p className="text-[#52B788] text-xs font-bold uppercase tracking-widest mb-4">
              Contacto
            </p>
            <h2 className="text-5xl font-black text-[#1B4332] leading-none">
              Fala<br />Comigo.
            </h2>
          </div>

          {/* Direita */}
          <div className="flex-2 min-w-[280px] max-w-lg">
            <p className="text-[#1B4332]/60 text-base leading-relaxed mb-10">
              Tens dúvidas sobre as aulas ou queres saber mais? Estou disponível por email ou Instagram.
            </p>

            <div className="flex flex-col">

              {/* Email */}
              <a
                href="mailto:thamytennis@gmail.com"
                className="flex items-center gap-5 py-5 border-b border-[#1B4332]/10 hover:pl-2 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-[#52B788] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <div className="flex-1">
                  <p className="text-[#52B788] text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                  <p className="text-[#1B4332] text-base font-semibold">thamytennis@gmail.com</p>
                </div>
                <span className="text-[#1B4332]/20 group-hover:text-[#52B788] transition-all duration-300 text-lg">↗</span>
              </a>

              <a
                href="https://instagram.com/thamyrys_nicolle1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 py-5 hover:pl-2 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-[#52B788] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3h10.5A3.75 3.75 0 0121 6.75v10.5A3.75 3.75 0 0117.25 21H6.75A3.75 3.75 0 013 17.25V6.75A3.75 3.75 0 016.75 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                  <circle cx="17" cy="7" r="0.75" fill="currentColor" />
                </svg>
                <div className="flex-1">
                  <p className="text-[#52B788] text-xs font-bold uppercase tracking-widest mb-1">Instagram</p>
                  <p className="text-[#1B4332] text-base font-semibold">@thamytennis</p>
                </div>
                <span className="text-[#1B4332]/20 group-hover:text-[#52B788] transition-all duration-300 text-lg">↗</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}