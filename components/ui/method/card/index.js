import Image from "next/legacy/image"
import Link from "next/link"
import { useEthPrice } from "@components/hooks/useEthPrice"

export default function Card({method, disabled, Footer}) {
  const { eth } = useEthPrice()
  const price = eth.perItem[method.id]

  return (
    <div 
        className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="flex h-full">
        <div className="flex-1 h-full next-image-wrapper">
            <Image className={`object-cover ${disabled && "filter grayscale"}`} 
            src={method.coverImage}
            layout="responsive"
            width="200"
            height="200"
            alt={method.title}
            />
        </div>
        <div className="p-8 pb-4 flex-2">
            <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
            {method.scale}
            </div>
            <Link href={`/methods/${method.slug}`}
            className="h-12 block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {method.title}
            </Link>
            {/* <p className="mt-2 text-gray-500">
            {method.price} - Độ bền {method.durabilityLevel}
            </p> */}
            <p className="mt-2 font-semibold text-green-600">{price}Ξ ~ {Number(price * eth.data).toFixed(2)}₫/tấn</p>
            <p className="mt-2 text-gray-500">
            {method.description.substring(0, 130)}...
            </p>
            { Footer &&
              <Footer/>
            }
        </div>
        </div>
    </div>
  )
}
