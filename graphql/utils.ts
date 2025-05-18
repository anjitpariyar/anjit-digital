import {
  HomePageBannerFragment,
  GetPageQuery,
  LessonSectionFragment,
  LessonFragment,
} from './types'

export type DeepRequired<T> = {
  [K in keyof T]-?: DeepRequired<NonNullable<T[K]>>
}

export type PageQuery = DeepRequired<GetPageQuery>

export type TemplatePageProps<T extends string> = PageQuery & {
  page: {
    template: Extract<PageQuery['page']['template'], { __typename?: T }>
  }
}

export interface ImageFragment {
  node:
    | {
        mediaItemUrl?: string | null | undefined
        altText?: string | null | undefined
        mediaDetails?:
          | {
              width?: number | null | undefined
              height?: number | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type BannerHomepage = NonNullable<
  HomePageBannerFragment['bannerHomepage']
>

export type LessonSectionProps = NonNullable<LessonSectionFragment['lesson']>

export type LessonFragmentProps = NonNullable<LessonFragment['lessons']>

export type LessonCardProps = NonNullable<LessonFragmentProps['nodes'][number]>
// Type for page.pageComponents.pageComponents inferred from PageQuery
export type PageComponentsArray =
  PageQuery['page']['pageComponents']['pageComponents'][number]

type ImagePropsWithDimensions = {
  src: string
  alt: string
  width: number
  height: number
}

export const getImagePropsWithDimensions = (
  data: ImageFragment
): ImagePropsWithDimensions => {
  return {
    src: data?.node?.mediaItemUrl ?? '',
    alt: data?.node?.altText ?? '',
    width: data?.node?.mediaDetails?.width ?? 0,
    height: data?.node?.mediaDetails?.height ?? 0,
  }
}
