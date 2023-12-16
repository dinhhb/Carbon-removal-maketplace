
import { Hero } from "@components/ui/common"
import { MethodList } from "@components/ui/method"
import { BaseLayout } from "@components/ui/layout"
import { getAllMethods } from "@content/methods/fetcher"
import { WalletBar } from "@components/ui/web3"
import { useAccount } from "@components/hooks/web3/useAccount"

export default function Marketplace({ methods }) {

    const { account } = useAccount()

    return (
        <>
            <Hero />
            <div className="py-4">
                <WalletBar
                    address={account.data} 
                />
            </div>
            <MethodList
                methods={methods}
            />
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