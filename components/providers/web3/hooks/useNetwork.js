import { useEffect } from "react"
import useSWR from "swr"

const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    5: "Goerli Test Network",
    1337: "Ganache",
    59140: "Linea Goerli Test Network",
    11155111: "Sepolia Test Network"
}

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

export const handler = (web3) => () => {

    const { data, ...rest } = useSWR(() =>
        web3 ? "web3/network" : null,
        async () => {
            const chainId = await web3.eth.getChainId()

            if (!chainId) {
                throw new Error("Cannot retreive network")
            }

            return NETWORKS[chainId]
        }
    )

    return{
        data,
        target: targetNetwork,
        isSupported: data === targetNetwork,
        ...rest
    }
}
