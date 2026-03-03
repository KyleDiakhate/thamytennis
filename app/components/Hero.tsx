import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-white pt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Treina ténis com <span className="text-green-600">paixão</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Aulas personalizadas para todos os níveis. Começa hoje a tua jornada no ténis.
          </p>
          <Link
            href="/booking"
            className="inline-block mt-8 bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition"
          >
            Marcar Treino
          </Link>
        </div>

        {/* Foto */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/IMG_8211.jpeg"
            alt="Treinadora de ténis"
            width={500}
            height={500}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>

      </div>
    </section>
  )
}