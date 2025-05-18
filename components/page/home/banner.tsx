import { GetPropsFunction } from '@/components/layouts/default-components-map'
import { buttonVariants } from '@/components/ui/button'
import { BannerHomepage, getImagePropsWithDimensions } from '@/graphql/utils'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function Banner(props: BannerHomepage) {
  return (
    <section className='w-full bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 py-12 md:py-24 lg:py-32 dark:from-purple-950/20 dark:via-purple-900/20 dark:to-purple-950/20'>
      <div className='mx-absolute container px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                {props?.title ?? ''}
              </h1>
              <p className='text-muted-foreground max-w-[600px] md:text-xl'>
                {props?.description ?? ''}
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link
                href={props?.button?.link ?? ''}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-purple-600 hover:bg-purple-700'
                )}
              >
                {props?.button?.label ?? ''}
              </Link>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            {props?.image?.node?.mediaItemUrl ? (
              <Image
                {...getImagePropsWithDimensions(props.image)}
                alt=''
                className='max-h-[70vh] rounded-lg object-cover shadow-xl'
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

const getProps: GetPropsFunction<
  'PageComponentsPageComponentsBannerHomepageLayout'
> = async (component): Promise<BannerHomepage> => {
  return {
    ...component.bannerHomepage,
  }
}

export { getProps }

export default Banner
