import Image from "next/legacy/image"
import Link from "next/link"

export default function Card({method}) {
  return (
    <div 
        className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="flex h-full">
        <div className="flex h-full">
            <Image className="object-cover" 
            src={method.coverImage}
            layout="fixed"
            width="200"
            height="200"
            alt={method.title}
            />
        </div>
        <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
            {method.scale}
            </div>
            <Link href={`/methods/${method.slug}`}
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {method.title}
            </Link>
            <p className="mt-2 text-gray-500">
            {method.price} - Độ bền {method.durabilityLevel}
            </p>
            <p className="mt-2 text-gray-500">
            {method.description}
            </p>
        </div>
        </div>
    </div>
  )
}
