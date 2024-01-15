import { normalizeOwnedMethod } from "@utils/normalize"
import useSWR from "swr"

export const handler = (web3, contract) => (account) => {
    const swrRes = useSWR(() => 
        (web3 && contract && account.data && account.isAdmin) ? `web3/managedMethods/${account.data}` : null,
        async () => {
            const methods = []
            const methodCount = await contract.methods.getMethodCount().call()

            for (let i = Number(methodCount) - 1; i >= 0; i--) {  // reverse loop -> newest method on top
                const methodHash = await contract.methods.getMethodHashAtIndex(i).call()
                const method = await contract.methods.getMethodByHash(methodHash).call()

                if (method) {
                    const normalized = normalizeOwnedMethod(web3)({ hash: methodHash }, method)
                    methods.push(normalized)
                } 
            }
            return methods
        }
    )
    return swrRes
}