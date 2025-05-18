import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { getImagePropsWithDimensions, LessonCardProps } from '@/graphql/utils'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const LessonCard = async (props: LessonCardProps) => {
  return (
    <Card className='overflow-hidden'>
      <div className='relative'>
        {props?.featuredImage?.node?.mediaItemUrl ? (
          <Image
            {...getImagePropsWithDimensions(props.featuredImage)}
            className='h-[220px] w-full object-cover'
          />
        ) : (
          <Image
            src='https://anjit.digital6.au/wp-content/uploads/2025/05/js-course-1.png'
            height={159}
            width={318}
            alt={props?.title ?? ''}
            className='h-[220px] w-full object-cover'
          />
        )}
      </div>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <Badge variant='outline' className='text-xs'>
            {props?.lessonCategories?.nodes[0]?.name}
          </Badge>
        </div>
        <CardTitle className='text-xl'>{props.title}</CardTitle>
        <CardDescription>{props.content}</CardDescription>
      </CardHeader>

      <div className='px-6 pb-6'>
        <Button className='w-full bg-purple-600 hover:bg-purple-700'>
          Enroll Now
        </Button>
      </div>
    </Card>
  )
}

export default LessonCard
