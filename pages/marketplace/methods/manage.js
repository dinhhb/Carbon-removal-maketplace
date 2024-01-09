import { Button } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { MethodFilter, OwnedMethodCard } from "@components/ui/method";

export default function ManageMethods() {

    return (
        <>
            <div className="py-4">
                <MarketHeader />
                <MethodFilter />
            </div>
            <section className="grid grid-cols-1">
                <OwnedMethodCard>
                    <div className="flex mr-2 relative rounded-md">
                        <input
                            type="text"
                            name="account"
                            id="account"
                            className="w-96 focus:ring-green-500 shadow-md focus:border-green-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0x2341ab..." />
                        <Button>
                            Verify
                        </Button>
                    </div>
                </OwnedMethodCard>
            </section>
        </>
    )
}

ManageMethods.Layout = BaseLayout