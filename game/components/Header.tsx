import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-3 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <Link href="/" className="text-xl font-bold tracking-wider hover:text-purple-200 transition-colors">
        Saswat Patra
      </Link>
      <a
        href="https://github.com/saswatpatra/Chidiya-Udd"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <Image
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="font-semibold">GitHub</span>
      </a>
    </header>
  )
}
