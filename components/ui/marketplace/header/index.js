import { useAccount } from "@components/hooks/web3";
import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";

const LINKS = [{
    href: "/marketplace",
    value: "Mua"
}, {
    href: "/marketplace/methods/owned",
    value: "Đơn hàng của tôi"
}, {
    href: "/marketplace/methods/managed",
    value: "Quản lý đơn hàng",
    requireAdmin: true
}]

export default function Header() {
    const { account } = useAccount()

    return (
        <>
            <div className="pt-4">
                <WalletBar />
            </div>
            <EthRates />
            <div className="flex flex-row-reverse p-4 sm:lg-6 lg:px-8">
                <Breadcrumbs 
                    isAdmin={account.isAdmin}
                    items={LINKS}/>
            </div>
        </>
    )
}