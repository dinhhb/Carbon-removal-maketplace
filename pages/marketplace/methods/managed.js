import { useAdmin, useManagedMethods } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { ManagedMethodCard, MethodFilter } from "@components/ui/method";
import { normalizeOwnedMethod } from "@utils/normalize";
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
    const [searchedMethod, setSearchedMethod] = useState(null)
    const [filters, setFilters] = useState({ state: "Tất cả" })
    const { web3, contract } = useWeb3()
    const { account } = useAdmin({ redirectTo: "/marketplace" })
    const { managedMethods } = useManagedMethods(account)

    const verifyMethod = (email, { hash, proof }) => {
        if (!email) {
            return
        }

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

    const changeMethodState = async (methodHash, method) => {
        try {
            await contract.methods[method](methodHash).send({ from: account.data })   // methods.activateMethod --> methods[method]
        } catch (e) {
            console.log(e.message)
        }
    }

    const activateMethod = async methodHash => {
        changeMethodState(methodHash, "activateMethod")
    }

    const deactivateMethod = async methodHash => {
        changeMethodState(methodHash, "deactivateMethod")
    }

    const searchMethod = async hash => {
        const re = /[0-9A-Fa-f]{6}/g;

        if (hash && hash.length === 66 && re.test(hash)) {
            const method = await contract.methods.getMethodByHash(hash).call()

            if (method.owner !== "0x0000000000000000000000000000000000000000") {
                const normalized = normalizeOwnedMethod(web3)({ hash }, method)
                setSearchedMethod(normalized)
                console.log(normalized)
                return
            }
        }
        setSearchedMethod(null)
    }

    const renderCard = (method) => {
        return (
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
                {method.state === "Đã mua" &&
                    <div className="mt-2">
                        <Button onClick={() => activateMethod(method.hash)}>
                            Kích hoạt
                        </Button>
                        <Button variant="red" onClick={() => deactivateMethod(method.hash)}>
                            Vô hiệu hoá
                        </Button>
                    </div>
                }
            </ManagedMethodCard>
        )
    }

    if (!account.isAdmin) {
        return null
    }

    const filteredMethods = managedMethods.data
        ?.filter(method => {
            if (filters.state === "Tất cả") {
                return true
            }
            return method.state === filters.state
        })
        .map(method => renderCard(method))

    return (
        <>
            <MarketHeader />
            <MethodFilter
                onFilterSelect={(value) => setFilters({ state: value })}
                onSearchSubmit={searchMethod}
            />
            <section className="grid grid-cols-1">
                {searchedMethod &&
                    <div>
                        <h1 className="text-xl font-bold p-5">Tìm kiếm</h1>
                        {renderCard(searchedMethod)}
                    </div>
                }
                <h1 className="text-xl font-bold p-5">Tất cả</h1>
                {filteredMethods}
                {filteredMethods?.length === 0 &&
                    <Message type="warning">
                        Không có phương pháp nào để hiển thị
                    </Message>
                }
            </section>
        </>
    )
}

ManagedMethods.Layout = BaseLayout