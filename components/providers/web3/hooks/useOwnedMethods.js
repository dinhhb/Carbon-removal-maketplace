import { createMethodHash } from "@utils/hash"
import { normalizeOwnedMethod } from "@utils/normalize"
import useSWR from "swr"

export const handler = (web3, contract) => (methods, account) => {

    const swrRes = useSWR(() => 
        (web3 && contract && account) ? `web3/ownedMethods/${account}` : null,
        async () => {
            const ownedMethods = []

            for (let i = 0; i < methods.length; i++) {
                const method = methods[i]

                if (!method.id) { continue }
                
                const methodHash = createMethodHash(web3)(method.id, account)

                const ownedMethod = await contract.methods.getMethodByHash(methodHash).call()
                if (ownedMethod.owner != "0x0000000000000000000000000000000000000000") {
                    const normalized = normalizeOwnedMethod(web3)(method, ownedMethod)
                    ownedMethods.push(normalized)
                }
            }
            
            return ownedMethods
        }
    )
    return {
        ...swrRes,
        lookup: swrRes.data?.reduce((a, c) => {
            a[c.id] = c
            return a
        }, {}) ?? {}
    }
}