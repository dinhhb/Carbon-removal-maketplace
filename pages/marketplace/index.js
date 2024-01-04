
import { Hero } from "@components/ui/common"
import { MethodCard, MethodList } from "@components/ui/method"
import { BaseLayout } from "@components/ui/layout"
import { getAllMethods } from "@content/methods/fetcher"
import { WalletBar } from "@components/ui/web3"
import { useAccount, useNetwork } from "@components/hooks/web3"

export default function Marketplace({ methods }) {

    const { account } = useAccount()
    const { network } = useNetwork()

    return (
        <>
            <Hero />
            <div className="py-4">
                <WalletBar
                    address={account.data} 
                    network={{
                        data: network.data,
                        target: network.target,
                        isSupported: network.isSupported,
                        hasInitialResponse: network.hasInitialResponse
                    }}
                />
            </div>
            <MethodList 
                methods={methods}
            >
                {method => 
                    <MethodCard
                        key={method.id} 
                        method={method}
                    /> 
                }
            </MethodList>
        </>
    )
}


export function getStaticProps() {
    const { data } = getAllMethods()

    return {
        props: {
            methods: data
        }
    }
}

Marketplace.Layout = BaseLayout