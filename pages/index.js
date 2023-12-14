
import { Hero } from "@components/common"
import { MethodList } from "@components/method"
import { BaseLayout } from "@components/layout"
import { getAllMethods } from "@content/methods/fetcher"

export default function Home({methods}) {
  return (
    <>
      <Hero />
      <MethodList 
        methods={methods}
      />
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