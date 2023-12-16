import {
    CourseHero,
    Example,
} from "@components/ui/method";

import { BaseLayout } from "@components/ui/layout";
import { Modal } from "@components/ui/common";
import { getAllMethods } from "@content/methods/fetcher";

export default function Course({method}) {

    return (
        <>
            <div className="py-4">
                <CourseHero 
                    title={method.title}
                    image={method.coverImage}
                />
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

export function getStaticPaths(){
    const { data } = getAllMethods()

    return{
        paths: data.map(c => ({
            params: {
                slug: c.slug
            }
        })),
        fallback: false
    }
}

export function getStaticProps({params}){
    const { data } = getAllMethods()
    const method = data.filter(c => c.slug === params.slug)[0]
  
    return {
      props: {
        method
      }
    }
  }


Course.Layout = BaseLayout