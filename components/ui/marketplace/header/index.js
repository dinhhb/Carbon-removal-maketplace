import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";

const LINKS = [{
    href: "/marketplace",
    value: "Mua"
}, {
    href: "/marketplace/methods/owned",
    value: "Đơn hàng của tôi"
}, {
    href: "/marketplace/methods/manage",
    value: "Quản lý đơn hàng"
}]

export default function Header() {
    return (
        <>
            <WalletBar />
            <EthRates />
            <div className="flex flex-row-reverse pb-4 px-4 sm:lg-6 lg:px-8">
                <Breadcrumbs items={LINKS}/>
            </div>
        </>
    )
}