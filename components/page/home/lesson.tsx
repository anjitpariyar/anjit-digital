import { GetPropsFunction } from '@/components/layouts/default-components-map'
import { LessonSectionProps } from '@/graphql/utils'
import React from 'react'
import LessonCommon from '@/components/common/lesson.common'

function Lesson(props: LessonSectionProps) {
  return (
    <section className='w-full py-12 md:py-24'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='mb-10 flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
              {props.title ?? ''}
            </h2>
            <p className='text-muted-foreground mx-auto max-w-[700px] md:text-xl'>
              {props?.description ?? ''}
            </p>
          </div>
        </div>

        <LessonCommon />
      </div>
    </section>
  )
}

const getProps: GetPropsFunction<
  'PageComponentsPageComponentsLessonSectionLayout'
> = async (component): Promise<LessonSectionProps> => {
  return {
    ...component.lesson,
  }
}

export { getProps }

export default Lesson
