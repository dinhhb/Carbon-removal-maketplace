import Image from 'next/image';
import Link from 'next/link'

export default function Footer() {
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex h-full items-center">
            <div className="flex items-center"> {/* Updated this line */}
              <Image src="/logo.png" alt="Logo" width={150} height={60} />
            </div>
            <div className="flex space-x-8"> {/* Updated this line */}
              <Link href="/" 
                className="font-medium text-gray-500 hover:text-green-600">
                Trang chủ
                </Link>
              <Link href="/" 
                className="font-medium text-gray-500 hover:text-green-600">
                Thị trường
              </Link>
            </div>
            <div className="flex-grow" />
            <div>
              <a href="#" className="font-medium mr-8 text-gray-500 hover:text-green-600">Log in</a>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
