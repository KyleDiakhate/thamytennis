import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-2xl font-bold text-green-500">Thamy Tennis</span>
        <div className="flex flex-col items-center md:items-start gap-1 text-gray-400 text-sm">
          <span>📧 thamytennis@gmail.com</span>
          <span>📞 +351 912 345 678</span>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Thamy Tennis. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  )
}