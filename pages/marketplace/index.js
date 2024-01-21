
import { Button, Loader } from "@components/ui/common"
import { MethodCard, MethodList } from "@components/ui/method"
import { BaseLayout } from "@components/ui/layout"
import { getAllMethods } from "@content/methods/fetcher"
import { useOwnedMethods, useWalletInfo } from "@components/hooks/web3"
import { OrderModal } from "@components/ui/order"
import { useState } from "react"
import { MarketHeader } from "@components/ui/marketplace"
import { useWeb3 } from "@components/providers"

export default function Marketplace({ methods }) {

    const { web3, contract, requireInstall } = useWeb3()
    const { hasConnectedWallet, isConnecting, account } = useWalletInfo()
    const { ownedMethods } = useOwnedMethods(methods, account.data)
    const [selectedMethod, setSelectedMethod] = useState(null)
    const [isNewPurchase, setIsNewPurchase] = useState(true)

    const purchaseMethod = async (order) => {
        const hexMethodId = web3.utils.utf8ToHex(selectedMethod.id)
        // console.log(hexMethodId)    // 0x31343130343734

        const orderHash = web3.utils.soliditySha3(
            { type: "bytes16", value: hexMethodId },    // 0x31343130343734000000000000000000
            { type: "address", value: account.data }    // 0xfe83114a5D27a4B2665DcA3439777a6C9987359F
        )
        // console.log(orderHash)  // 0x6eff191f0ef27555bf12365ae52cea873ea30f5af7eaf985f9e660bd05822d03

        const value = web3.utils.toWei(String(order.price))

        if (isNewPurchase) {
            const emailHash = web3.utils.sha3(order.email)
            // console.log(emailHash)  // test@gmail.com af257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b902

            const proof = web3.utils.soliditySha3(
                { type: "bytes32", value: emailHash },  // 0xaf257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b902
                { type: "bytes32", value: orderHash }   // 0x6eff191f0ef27555bf12365ae52cea873ea30f5af7eaf985f9e660bd05822d03
            )
            // console.log(proof)  // 0x048528f7a1444b5b21dccad6060899e4d3ae4b6090595c861aaa53a13d554329
            _purchaseMethod(hexMethodId, proof, value)
        } else {
            _repurchaseMethod(orderHash, value)
        }
    }

    const _purchaseMethod = async (hexMethodId, proof, value) => {
        try {
            const result = await contract.methods.purchaseMethod(hexMethodId, proof).send({ from: account.data, value })
            console.log(result)
        } catch {
            console.error("Purchase method: Operation has failed.")
        }
    }

    const _repurchaseMethod = async (methodHash, value) => {
        try {
            const result = await contract.methods.repurchaseMethod(methodHash).send({ from: account.data, value })
            console.log(result)
        } catch {
            console.error("Purchase method: Operation has failed.")
        }
    }

    return (
        <>
            {/* <Hero /> */}
            <MarketHeader />
            <MethodList methods={methods}>
                {method => {
                    const owned = ownedMethods.lookup[method.id]
                    return (
                        <MethodCard
                            key={method.id}
                            method={method}
                            state={owned?.state}
                            disabled={!hasConnectedWallet}
                            Footer={() => {
                                if (requireInstall) {
                                    return (
                                        <Button
                                            size="sm"
                                            disabled={!hasConnectedWallet}
                                            variant="lightGreen">
                                            Tải
                                        </Button>
                                    )
                                }

                                if (isConnecting) {
                                    return (
                                        <Button
                                            size="sm"
                                            disabled={!hasConnectedWallet}
                                            variant="lightGreen">
                                            <Loader size="sm" />
                                        </Button>
                                    )
                                }

                                if (!ownedMethods.hasInitialResponse) {
                                    return (
                                        <div style={{ height: "50px" }}></div>
                                    )
                                }

                                if (owned) {
                                    return (
                                        <>
                                            <div className="flex">
                                                <Button
                                                    size="sm"
                                                    disabled={true}
                                                    variant="lightGreen">
                                                    Đã mua
                                                </Button>
                                                {owned.state === "Đã vô hiệu hoá" &&
                                                    <div className="ml-1">
                                                        <Button
                                                            size="sm"
                                                            disabled={false}
                                                            onClick={() => {
                                                                setIsNewPurchase(false)
                                                                setSelectedMethod(method)
                                                            }}
                                                            variant="green"
                                                        >
                                                            Phí kích hoạt
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </>
                                    )
                                }

                                return (
                                    <Button
                                        size="sm"
                                        onClick={() => setSelectedMethod(method)}
                                        disabled={!hasConnectedWallet}
                                        variant="lightGreen">
                                        Mua
                                    </Button>
                                )
                            }
                            }
                        />
                    )
                }
                }
            </MethodList>
            {selectedMethod &&
                <OrderModal
                    isNewPurchase={isNewPurchase}
                    method={selectedMethod}
                    onSubmit={purchaseMethod}
                    onClose={() => {
                        setSelectedMethod(null)
                        setIsNewPurchase(true)
                    }}
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