import { Button, Message } from "@components/ui/common";
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
                <OwnedMethodCard>
                    <Message>
                        abc
                    </Message>
                    <Button>
                        Watch the course
                    </Button>
                </OwnedMethodCard>
            </section>
        </>
    )
}

OwnedMethods.Layout = BaseLayout