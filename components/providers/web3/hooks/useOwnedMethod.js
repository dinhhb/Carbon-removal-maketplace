import { createMethodHash } from "@utils/hash"
import { normalizeOwnedMethod } from "@utils/normalize"
import useSWR from "swr"

export const handler = (web3, contract) => (method, account) => {

    const swrRes = useSWR(() =>
        (web3 && contract && account) ? `web3/ownedMethod/${account}` : null,

        async () => {
            
            const methodHash = createMethodHash(web3)(method.id, account)

            const ownedMethod = await contract.methods.getMethodByHash(methodHash).call()
            if (ownedMethod.owner === "0x0000000000000000000000000000000000000000") {
                return null
            }

            return normalizeOwnedMethod(web3)(method, ownedMethod)
        }
    )
    return swrRes
}