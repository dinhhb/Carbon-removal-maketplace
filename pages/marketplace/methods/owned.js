import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OwnedMethodCard } from "@components/ui/method";

export default function OwnedMethods() {

    return (
        <>
            <div className="py-4">
                <MarketHeader />
            </div>
            <section className="grid grid-cols-1">
                <OwnedMethodCard />
            </section>
        </>
    )
}

OwnedMethods.Layout = BaseLayout