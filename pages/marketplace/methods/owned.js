import { useAccount, useOwnedMethods } from "@components/hooks/web3";
import { Button, Message } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OwnedMethodCard } from "@components/ui/method";
import { getAllMethods } from "@content/methods/fetcher";

export default function OwnedMethods({ methods }) {
    const { account } = useAccount()
    const { ownedMethods } = useOwnedMethods(methods, account.data)

    return (
        <>
            <div className="py-4">
                <MarketHeader />
            </div>
            <section className="grid grid-cols-1">
                {ownedMethods.data?.map(method =>
                    <OwnedMethodCard
                        key={method.id}
                        method={method}
                    >
                        {/* <Message>
                            Test message
                        </Message> */}
                        {/* <Button>
                            Test button
                        </Button> */}
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