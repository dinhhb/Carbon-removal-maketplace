import Image from "next/legacy/image"
import Link from "next/link"
import { useEthPrice } from "@components/hooks/useEthPrice"

export default function Card({ method, disabled, Footer, state }) {
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
        <div className="p-8 pb-4 flex-1.5">
          <div className="flex items-center">
            <div className="uppercase mr-2 tracking-wide text-sm text-green-600 font-semibold">
              {method.scale}
            </div>
            <div>
              { state === "Đã kích hoạt" &&
                <div className="text-xs text-green-700 bg-green-200 p-1 px-3 rounded-full">
                  Đã kích hoạt
                </div>
              }
              { state === "Đã vô hiệu hoá" &&
                <div className="text-xs text-red-700 bg-red-200 p-1 px-3 rounded-full">
                  Đã vô hiệu hoá
                </div>
              }
              { state === "Đã mua" &&
                <div className="text-xs text-yellow-700 bg-yellow-200 p-1 px-3 rounded-full">
                  Đã mua
                </div>
              }
            </div>
          </div>
          <Link href={`/methods/${method.slug}`}
            className="h-12 block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline">
            {method.title}
          </Link>
          {/* <p className="mt-2 text-gray-500">
            {method.price} - Độ bền {method.durabilityLevel}
            </p> */}
          <p className="mt-2 font-semibold text-green-600">{price}Ξ ~ {Number(price * eth.data).toFixed(2)}₫/tấn</p>
          <p className="mt-2 mb-4 text-sm sm:text-base text-gray-500">
            {method.description.substring(0, 120)}...
          </p>
          {Footer &&
            <div className="mt-2">
              <Footer />
            </div>
          }
        </div>
      </div>
    </div>
  )
}
