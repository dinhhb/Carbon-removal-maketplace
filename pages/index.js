
import { Hero } from "@components/ui/common"
import { MethodList, MethodCard } from "@components/ui/method"
import { BaseLayout } from "@components/ui/layout"
import { getAllMethods } from "@content/methods/fetcher"

export default function Home({methods}) {
  // console.log(web3)
  return (
    <>
      <Hero />
      <MethodList 
          methods={methods}
      >
          {method => 
              <MethodCard
                key={method.id} 
                method={method}
              /> 
          }
      </MethodList>
    </>
  )
}


export function getStaticProps(){
  const { data } = getAllMethods()

  return {
    props: {
      methods: data
    }
  }
}

Home.Layout = BaseLayout