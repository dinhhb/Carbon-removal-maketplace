import useSWR from "swr"
import methods from "@content/methods"

const URL = "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false"
const METHOD_PRICE = 4000000

const fetcher = async (url) => {
    const res = await fetch(url)
    const json = await res.json()
    // debugger
    return json.market_data.current_price.vnd ?? null
}

export const useEthPrice = () => {

    const { data, ...rest } = useSWR(
        URL,
        fetcher,
        // { refreshInterval: 1000 }
    )

    // const perItem = (data && (METHOD_PRICE / Number(data)).toFixed(6)) ?? null

    const perItem = {}

    methods.forEach(method => {
        const price = method?.price ?? METHOD_PRICE;
        perItem[method.id] = data ? (price / Number(data)).toFixed(6): null
    });

    return { eth: { data, perItem, ...rest } }
    // return swrRes
}