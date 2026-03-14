import Image from 'next/image'

export default function About(){
    return(
        <section id="sobre" className="bg-[#f0f7f4] py-24">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/3 flex justify-center">
                    <div
                        className="relative w-[320px] h-[420px] transition-transform duration-500 hover:scale-105"
                        style={{ borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }}
                    >
                        <Image
                            src="/IMG_4849.JPG"
                            alt="Thamyrys Araújo"
                            fill
                            quality={100}
                            className="object-cover"
                            style={{ borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                        />
                    </div>
                </div>
                <div className="md:w-2/3">
                    <p className="text-[#52B788] font-semibold text-sm uppercase tracking-widest mb-4">
                        Sobre Mim
                    </p>
                    <h2 className="text-5xl font-extrabold text-[#1B4332] leading-tight mb-6">
                        Thamyrys Araújo
                    </h2>
                    <p className="text-[#1B4332]/70 text-lg leading-relaxed mb-6">
                        Natural do Brasil, comecei a jogar ténis aos 5 anos e aos 9 já competia em torneios. 
                        Fui bolsista no Esporte Clube Pinheiros e aos 16 anos mudei-me para Espanha. 
                        Hoje vivo em Portugal — onde cheguei ao ranking 1 de seniores femininos.
                    </p>
                    <ul className="flex flex-col gap-3">
                        {[
                            "Competidora ativa no circuito nacional",
                            "Ranking 1 de seniores femininos em Portugal",
                            "Treinos para crianças, adolescentes e adultos",
                            "Experiência no Clube Parque das Nações, Lisboa",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#52B788" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                     <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span className="text-[#1B4332]/70 text-base">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    )
}