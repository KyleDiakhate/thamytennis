
const services = [
    {
        title: "Crianças", 
        subtitle: "A partir dos 9 anos",
        description: "Introdução ao ténis",
        format: "Aula em Grupos", 
        detail: "Máx. 8 crinaças por grupo",
        prices: [
            { label: "Grupos", price: "20€"}
        ]
    }, 
    {
        title: "Adolescentes", 
        subtitle: "13 - 17 anos",
        description: "Treinos personalizados para o nivel que querem cheagar",
        format: "Individual ou Grupo", 
        detail: "Máx. 4 por grupo",
        prices: [
            { label: "Individual", price: "35€"},
            { label: "Grupo", price: "25€"},
        ]
    }, 
    {
        title: "Adultos", 
        subtitle: "+18 anos ",
        description: "Nunca é tarde para começar. Aulas persolizadas dependo do nivel",
        format: "Individuais ou Grupo", 
        detail: "Máx. 4 por grupo",
        prices: [
            { label: "Individual", price: "45€"},
            { label: "Grupo", price: "30€"},
        ]
    }, 
]
type Props = {
  onBooking: () => void
}


export default function Service( {onBooking }: Props){
    return(
        <section id="servicos" className="bg-[#f0f7f4] py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-[#52B788] font-semibold text-sm uppercase tracking-widest mb-4">
                        Serviços
                    </p>
                    <h2 className="text-4xl font-bold text-[#1B4332] leading-tight mb-4">
                        Para quem é?
                    </h2>
                    <p className="text-[#1B4332]/60 text-lg max-w-md mx-auto">
                        Treinos personalizados para todos os niveis e idades 
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            onClick={onBooking}
                            className="bg-[#1f3d2e] rounded-xl p-8 hover:bg-[#1B4332] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        >
                            <p className="text-[#52B788] text-xs font-semibold uppercase tracking-widest mb-3">
                                {service.subtitle}
                            </p>  
                            <h3 className="text-white text-2xl font-bold mb-4">
                                {service.title}
                            </h3>
                            <p className="text-white/55 text-sm leading-relaxed mb-6">
                                {service.description}
                            </p>

                            <div className="flex gap-4 mb-6">
                                {service.prices.map((p) => (
                                    <div key={p.label} className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                                        <p className="text-white/50 text-xs mb-1">{p.label}</p>
                                        <p className="text-white text-2xl font-bold">{p.price}</p>
                                        <p className="text-white/40 text-xs">por aula</p>
                                    </div>
                                ))}
                            </div>
                               <div className="h-px bg-white/10 mb-6" />
                            <div className="flex flex-col gap-2 mb-6">
                                    <span className="text-white/50 text-sm">{service.detail}</span>
                            </div>
                            <span className="text-[#52B788] text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                Marcar Treino <span>→</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}