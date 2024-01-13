
import { Button } from "@components/ui/common"
import { MethodCard, MethodList } from "@components/ui/method"
import { BaseLayout } from "@components/ui/layout"
import { getAllMethods } from "@content/methods/fetcher"
import { useWalletInfo } from "@components/hooks/web3"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { MarketHeader } from "@components/ui/marketplace"
import { useWeb3 } from "@components/providers"

export default function Marketplace({ methods }) {

    const { web3, contract } = useWeb3()
    const { canPurchaseMethod, account } = useWalletInfo()
    const [selectedMethod, setSelectedMethod] = useState(null)

    const purchaseMethod = async (order) => {
        const hexMethodId = web3.utils.utf8ToHex(selectedMethod.id)
        // console.log(hexMethodId)    // 0x31343130343734

        const orderHash = web3.utils.soliditySha3(
            { type: "bytes16", value: hexMethodId },    // 0x31343130343734000000000000000000
            { type: "address", value: account.data }    // 0xfe83114a5D27a4B2665DcA3439777a6C9987359F
        )
        // console.log(orderHash)  // 0x6eff191f0ef27555bf12365ae52cea873ea30f5af7eaf985f9e660bd05822d03

        const emailHash = web3.utils.sha3(order.email)
        // console.log(emailHash)  // test@gmail.com af257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b902

        const proof = web3.utils.soliditySha3(
            { type: "bytes32", value: emailHash },  // 0xaf257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b902
            { type: "bytes32", value: orderHash }   // 0x6eff191f0ef27555bf12365ae52cea873ea30f5af7eaf985f9e660bd05822d03
        )
        // console.log(proof)  // 0x048528f7a1444b5b21dccad6060899e4d3ae4b6090595c861aaa53a13d554329

        const value = web3.utils.toWei(String(order.price))

        try {
            const result = await contract.methods.purchaseMethod(
                hexMethodId,
                proof
            ).send({from: account.data, value})
            console.log(result)
        } catch {
            console.error("Purchase method: Operation has failed.")
        }
    }

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
                    onSubmit={purchaseMethod}
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