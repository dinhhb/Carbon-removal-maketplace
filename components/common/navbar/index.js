import Image from 'next/image';

export default function Footer() {
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div className="flex items-center"> {/* Updated this line */}
              <Image src="/logo.png" alt="Logo" width={150} height={60} />
            </div>
            <div className="flex space-x-8"> {/* Updated this line */}
              <a href="#" className="font-medium text-gray-500 hover:text-green-600">Product</a>
              <a href="#" className="font-medium text-gray-500 hover:text-green-600">Features</a>
              <a href="#" className="font-medium text-gray-500 hover:text-green-600">Marketplace</a>
            </div>
            <div>
              {/* <a href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Company</a> */}
              <a href="#" className="font-medium mr-8 text-gray-500 hover:text-green-600">Log in</a>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
