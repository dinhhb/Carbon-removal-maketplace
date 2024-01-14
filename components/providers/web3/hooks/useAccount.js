import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
    "0xc4bdd85d1fb6fbd30b3d33684d763af2a325d93877860f38e14ae5a99a98d1ce": true
}

export const handler = (web3, provider) => () => {

    const { data, mutate, ...rest } = useSWR(() =>
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts()
            const account = accounts[0]

            if (!account) {
                throw new Error("Cannot retreive account")
            }

            return account
        }
    )

    useEffect(() => {
        const mutator = (accounts) => mutate(accounts[0] ?? null)

        provider?.on("accountsChanged", mutator)
        console.log(provider)

        return () => {
            provider?.removeListener("accountsChanged", mutator)
        }
    }, [provider])

    return {
        data,
        isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate,
        ...rest
    }
}