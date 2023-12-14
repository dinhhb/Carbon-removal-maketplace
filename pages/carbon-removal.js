import {
  CourseHero,
  Example,
} from "@components/course";

import { BaseLayout } from "@components/layout";
import { Modal } from "@components/common";

export default function Course() {

  return (
    <>
      <div className="py-4">
        <CourseHero />
        <Example/>
      </div>
   </>
  )
}

Course.Layout = BaseLayout