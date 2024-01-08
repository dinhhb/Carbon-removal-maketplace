
import { Button, Hero } from "@components/ui/common"
import { MethodCard, MethodList } from "@components/ui/method"
import { BaseLayout } from "@components/ui/layout"
import { getAllMethods } from "@content/methods/fetcher"
import { useWalletInfo } from "@components/hooks/web3"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { MarketHeader } from "@components/ui/marketplace"

export default function Marketplace({ methods }) {

    const [selectedMethod, setSelectedMethod] = useState(null)
    const { canPurchaseMethod } = useWalletInfo()

    return (
        <>
            {/* <Hero /> */}
            <div className="py-4">
                <MarketHeader/>
            </div>
            <MethodList
                methods={methods}
            >
                {method =>
                    <MethodCard
                        key={method.id}
                        method={method}
                        disabled={!canPurchaseMethod}
                        Footer={() =>
                            <div className="mt-4">
                                <Button
                                    onClick={() => setSelectedMethod(method)}
                                    disabled={!canPurchaseMethod}
                                    variant="lightGreen">
                                    Mua
                                </Button>
                            </div>
                        }
                    />
                }
            </MethodList>
            {selectedMethod &&
                <OrderModal
                    method={selectedMethod}
                    onClose={() => setSelectedMethod(null)}
                />
            }
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