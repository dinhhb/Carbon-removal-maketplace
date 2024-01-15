import { useAdmin, useManagedMethods } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { ManagedMethodCard, MethodFilter } from "@components/ui/method";
import { useState } from "react";

const VerificationInput = ({ onVerify }) => {
    const [email, setEmail] = useState("")

    return (
        <div className="flex mr-2 relative rounded-md">
            <input
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                type="text"
                name="account"
                id="account"
                className="w-96 focus:ring-green-500 shadow-md focus:border-green-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                placeholder="0x2341ab..." />
            <Button
                onClick={() => {
                    onVerify(email)
                }}
            >
                Xác thực
            </Button>
        </div>
    )
}

export default function ManagedMethods() {
    const [proofedOwnership, setProofedOwnership] = useState({})
    const { web3 } = useWeb3()
    const { account } = useAdmin({redirectTo: "/marketplace"})
    const { managedMethods } = useManagedMethods(account)

    const verifyMethod = (email, { hash, proof }) => {
        const emailHash = web3.utils.sha3(email)
        const proofToCheck = web3.utils.soliditySha3(
            { type: "bytes32", value: emailHash },
            { type: "bytes32", value: hash }
        )

        proofToCheck === proof ?
            setProofedOwnership({
                ...proofedOwnership,
                [hash]: true
            }) :
            setProofedOwnership({
                ...proofedOwnership,
                [hash]: false
            })
    }

    if (!account.isAdmin) {
        return null
    }

    return (
        <>
            <MarketHeader />
            <MethodFilter />
            <section className="grid grid-cols-1">
                {managedMethods.data?.map(method =>
                    <ManagedMethodCard
                        key={method.ownedMethodId}
                        method={method}
                    >
                        <VerificationInput
                            onVerify={email => {
                                verifyMethod(email, {
                                    hash: method.hash,
                                    proof: method.proof
                                })
                            }}
                        />
                        {proofedOwnership[method.hash] &&
                            <div className="mt-2">
                                <Message type="success">Hợp lệ!</Message>
                            </div>
                        }
                        {proofedOwnership[method.hash] === false &&
                            <div className="mt-2">
                                <Message type="danger">Không hợp lệ!</Message>
                            </div>
                        }
                    </ManagedMethodCard>
                )}
            </section>
        </>
    )
}

ManagedMethods.Layout = BaseLayout