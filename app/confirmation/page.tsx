import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md text-center">
          <div className="text-5xl mb-4">🎾</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedido enviado!</h1>
          <p className="text-gray-500 mb-8">
            A tua marcação foi recebida. A treinadora irá confirmar em breve.
          </p>
          <Link
            href="/"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    </>
  )
}