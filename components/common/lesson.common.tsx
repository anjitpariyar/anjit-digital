import sdk from '@/graphql/sdk'
import { notFound } from 'next/navigation'
import React from 'react'
import LessonCard from './lesson.card'

async function LessonCommon() {
  const data = await sdk.GetAllLesson()
  if (!data?.lessons) {
    return notFound()
  }
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {data?.lessons?.nodes?.map((lesson) => (
        <LessonCard key={lesson?.slug} {...lesson} />
      ))}
    </div>
  )
}

export default LessonCommon
