import { useWalletInfo } from "@components/hooks/web3"
import { useWeb3 } from "@components/providers"
import { Button } from "@components/ui/common"


export default function WalletBar() {

  const { account, network } = useWalletInfo()
  const { requireInstall } = useWeb3()

  return (
    <section className="text-white bg-green-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-base xs:text-xl break-words">Xin chào, {account.data}</h1>
        <h2 className="subtitle mb-5 text-xl"></h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button
              variant="white"
              className="mr-2 text-sm xs:text-lg p-2">
              Xem cách thanh toán
            </Button>
          </div>
          <div>
            {network.hasInitialResponse && !network.isSupported &&
              <div className="bg-red-400 p-4 rounded-lg">
                <div>Kết nối mạng không đúng</div>
                <div>
                  Kết nối tới: {` `}
                  <strong className="text-2xl">{network.target}</strong>
                </div>
              </div>
            }
            {requireInstall &&
              <div className="bg-yellow-500 p-4 rounded-lg">
                Không thể kết nối mạng. Hãy tải Metamask.
              </div>
            }
            {network.data &&
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
