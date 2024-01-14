import {
    CourseHero,
    Example,
} from "@components/ui/method";

import { BaseLayout } from "@components/ui/layout";
import { Message, Modal } from "@components/ui/common";
import { getAllMethods } from "@content/methods/fetcher";
import { useAccount, useOwnedMethod } from "@components/hooks/web3";

export default function Course({ method }) {

    const { account } = useAccount()
    const { ownedMethod } = useOwnedMethod(method, account.data)
    const methodState = ownedMethod.data?.state

    return (
        <>
            <div className="py-4">
                <CourseHero
                    hasOwner={!!ownedMethod.data}
                    title={method.title}
                    image={method.coverImage}
                />
                {methodState &&
                    <div>
                        {methodState === "Đã mua" &&
                            <Message type="warning">
                                Bạn đã mua phương pháp này. Vui lòng đợi quá trình xác nhận được thực hiện.
                            </Message>
                        }
                        {methodState === "Đã kích hoạt" &&
                            <Message type="success">
                                Quá trình xác nhận thành công. Dự án sẽ sớm được triển khai.
                            </Message>
                        }
                        {methodState === "Đã vô hiệu hoá" &&
                            <Message type="danger">
                                Quá trình xác nhận không thành công do thông tin thanh toán không hợp lệ.
                            </Message>
                        }
                    </div>
                }
                <Example
                    price={method.price}
                    durability={method.durability}
                    scale={method.scale}
                    alsoBoughtBy={method.alsoBoughtBy}
                    overview={method.overview}
                    science={method.science}
                    researchPapers={method.researchPapers}
                    supplier={method.supplier}
                    projectLocation={method.projectLocation}
                />
            </div>
        </>
    )
}

export function getStaticPaths() {
    const { data } = getAllMethods()

    return {
        paths: data.map(c => ({
            params: {
                slug: c.slug
            }
        })),
        fallback: false
    }
}

export function getStaticProps({ params }) {
    const { data } = getAllMethods()
    const method = data.filter(c => c.slug === params.slug)[0]

    return {
        props: {
            method
        }
    }
}


Course.Layout = BaseLayout