import { useWalletInfo } from "@components/hooks/web3"
import { useWeb3 } from "@components/providers"


export default function WalletBar() {

  const { account, network } = useWalletInfo()
  const { requireInstall } = useWeb3()

  return (
    <section className="text-white bg-green-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-2xl">Hello, {account.data}</h1>
        <h2 className="subtitle mb-5 text-xl">I hope you are having a great day!</h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
                Learn how to purchase
              </a>
            </div>
          </div>
          <div>
            { network.hasInitialResponse && !network.isSupported &&
              <div className="bg-red-400 p-4 rounded-lg">
                <div>Kết nối mạng không đúng</div>
                <div>
                  Kết nối tới: {` `}
                  <strong className="text-2xl">{network.target}</strong>
                </div>
              </div>
            }
            { requireInstall &&
              <div className="bg-yellow-500 p-4 rounded-lg">
                Không thể kết nối mạng. Hãy tải Metamask.  
              </div>
            }
            { network.data &&
              <div>
                <span>Mạng đang kết nối: </span>
                <strong className="text-2xl">{network.data}</strong>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}
