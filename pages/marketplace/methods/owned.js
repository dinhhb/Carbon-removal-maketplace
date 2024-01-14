import { useAccount, useOwnedMethods } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OwnedMethodCard } from "@components/ui/method";
import { getAllMethods } from "@content/methods/fetcher";
import Link from "next/link";
import { useRouter } from "next/router";

export default function OwnedMethods({ methods }) {
    const { account } = useAccount()
    const { requireInstall } = useWeb3()
    const { ownedMethods } = useOwnedMethods(methods, account.data)
    const router = useRouter()

    return (
        <>
            <MarketHeader />
            <section className="grid grid-cols-1">
                {ownedMethods.isEmpty &&
                    <div>
                        <Message type="warning">
                            <div>Bạn chưa mua bất kỳ phương pháp nào</div>
                            <Link className="font-normal hover:underline" href="/marketplace">
                                    <i>Tiến hành mua</i>
                            </Link>
                        </Message>
                    </div>
                }
                {account.isEmpty &&
                    <div>
                        <Message type="warning">
                            <div>Hãy kết nối tới Metamask</div>
                        </Message>
                    </div>
                }
                {requireInstall &&
                    <div>
                        <Message type="warning">
                            <div>Hãy tải Metamask</div>
                        </Message>
                    </div>
                }
                {ownedMethods.data?.map(method =>
                    <OwnedMethodCard
                        key={method.id}
                        method={method}
                    >
                        <Button onClick={() => router.push(`/methods/${method.slug}`)}>
                            Xem chi tiết
                        </Button>
                    </OwnedMethodCard>
                )}
            </section>
        </>
    )
}

export function getStaticProps() {
    const { data } = getAllMethods()

    return {
        props: {
            methods: data
        }
    }
}

OwnedMethods.Layout = BaseLayout