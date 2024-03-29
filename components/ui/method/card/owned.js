import Image from "next/legacy/image"

const STATE_COLORS = {
  "Đã mua": "yellow",
  "Đã được xác nhận": "green",
  "Đã bị từ chối": "red"
}

export default function OwnedMethodCard({ children, method }) {

  const stateColor = STATE_COLORS[method.state]

  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="block sm:flex">
        <div className="flex-1">
        <div className="h-72 sm:h-full next-image-wrapper">
            <Image
              className="object-cover"
              src={method.coverImage}
              width="200"
              height="200"
              layout="responsive"
              alt={method.title}
            />
        </div>
        </div>
        <div className="flex-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              <span className="mr-2">{method.title}</span>
              <span className={`text-xs text-${stateColor}-700 bg-${stateColor}-200 rounded-full p-2`}>
                {method.state}
              </span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {method.price} ETH
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {method.ownedMethodId}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Proof
                </dt>
                <dd className="mt-1 text-sm break-words text-gray-900 sm:mt-0 sm:col-span-2">
                  {method.proof}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                {children}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}