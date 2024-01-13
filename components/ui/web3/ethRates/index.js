import { useEthPrice } from "@components/hooks/useEthPrice"
import { Loader } from "@components/ui/common"
import Image from "next/image"

export default function EthRates() {
  const { eth } = useEthPrice()

  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            {eth.data ?
              <>
                <Image
                  layout="fixed"
                  alt=""
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
                <span className="text-2xl font-bold">
                  = {eth.data} ₫
                </span>
              </> :
              <div className="w-full flex justify-center">
                <Loader size="md" />
              </div>
            }
          </div>
          <p className="text-xl text-gray-500">Current eth Price</p>
        </div>
      </div>
      {/* <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              {eth.ethPerItem}
            </span>
            <Image
              layout="fixed"
              height="35"
              width="35"
              alt=""
              src="/small-eth.webp"
            />
            <span style={{ whiteSpace: 'nowrap' }} className="text-2xl font-bold"> = 4000000 ₫</span>
          </div>
          <p className="text-xl text-gray-500">Price per method</p>
        </div>
      </div> */}
    </div>
  )
}
