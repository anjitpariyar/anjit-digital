import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

import ComponentNotFound from '@/components/common/component-not-found'
import DefaultComponents from '@/components/layouts/default-components'
import {
  componentsMap,
  ComponentTypeNames,
  PageComponentData,
} from '@/components/layouts/default-components-map'
import sdk from '@/graphql/sdk'
import { GetPageQuery } from '@/graphql/types'
import { DeepRequired, TemplatePageProps } from '@/graphql/utils'

// 600
export const revalidate = 600

type PagePropsTypes = Promise<{ slug: string[] }>

// mostly we are working for default template, Unknown template is not implemented and render not found
type DefaultPageProps =
  | {
      template: 'Default'
      data: {
        components: {
          __typename: ComponentTypeNames
          data: unknown
        }[]
      }
    }
  | {
      template: 'Unknown'
      data: null
    }

// nextjs function to generate static paths
// export async function generateStaticParams() {
//   const pageUris = await unstable_cache(
//     async () => await sdk.GetPageUris(),
//     ['pageUris'],
//     {
//       tags: ['pageUris'],
//       revalidate,
//     }
//   )()

//   const path =
//     pageUris?.pages?.nodes?.map((page) => ({
//       slug: page?.uri?.split('/').filter((segment) => segment) || [],
//     })) || []

//   return path
// }

// nextjs function to generate metadata
// this is used to generate the title and description of the page (not global)
export async function generateMetadata(props: { params: PagePropsTypes }) {
  const { slug } = await props.params
  const uri = slug ? `/${slug.join('/')}` : '/'

  const cacheKey = `${slug ? slug.join('/') : 'home'}`

  try {
    // const query = (await sdk.GetPage({ uri })) as DeepRequired<GetPageQuery>

    // disable cache for dev
    const query = (await unstable_cache(
      async () => await sdk.GetPage({ uri }),
      [cacheKey],
      {
        tags: [cacheKey],
        revalidate,
      }
    )()) as DeepRequired<GetPageQuery>
    if (!query.page) return notFound()

    return {
      title: {
        ...(uri === '/'
          ? { absolute: query.page.title || '' }
          : {
              default: query.page.title,
            }),
      },
      // image: query.page.seo?.,
    }
  } catch {
    return {
      title: {
        default: 'anjit digital',
      },
      description: '',
      // image: '',
    }
  }
}

// this is required as homepage uri is empty string but in the pageUris it is '/'
const normalizeUri = (uri: string) => uri.replace(/\/+$/, '')

// main function of the [[...slug]]/page.tsx
const DynamicPage = async (props: { params: PagePropsTypes }) => {
  const { slug } = await props.params
  // const cacheKey = `${slug ? slug.join('/') : 'home'}`
  let uri = normalizeUri(slug ? `/${slug.join('/')}` : '/')

  // Special case for homepage
  if (uri === '') {
    uri = '/'
  }

  const pageUris = await sdk.GetPageUris()

  // const pageUris = await unstable_cache(
  //   async () => await sdk.GetPageUris(),
  //   ['pageUris'],
  //   {
  //     tags: ['pageUris'],
  //     revalidate,
  //   }
  // )()

  const paths =
    pageUris?.pages?.nodes?.map((node) => normalizeUri(node!.uri!)) ?? []

  // Special case for homepage in pageUris
  const normalizedPageUris = paths.map((pageUri) =>
    pageUri === '' ? '/' : pageUri
  )

  // check for valid page uri
  if (!normalizedPageUris.includes(uri)) return notFound()

  let query: DeepRequired<GetPageQuery>

  try {
    query = (await sdk.GetPage({
      uri,
    })) as DeepRequired<GetPageQuery>
  } catch {
    throw new Error()
  }

  // disable cache for dev
  // const query = (await unstable_cache(
  //   async () => await sdk.GetPage({ uri }),
  //   [cacheKey],
  //   {
  //     tags: [cacheKey],
  //     revalidate,
  //   }
  // )()) as DeepRequired<GetPageQuery>

  if (!query?.page) return notFound()

  let defaultPageProps: DefaultPageProps

  if (
    query?.page?.template !== null &&
    query.page.template?.__typename == 'DefaultTemplate' &&
    query.page.pageComponents.pageComponents
  ) {
    const template = (query as TemplatePageProps<'DefaultTemplate'>).page
      .pageComponents
    // const typenames = template.pageComponents.map(
    //   (c) => c.__typename
    // ) as ComponentTypeNames[]

    defaultPageProps = {
      template: 'Default',
      data: {
        // layout: {
        //   ...layout,
        // },
        components: await Promise.all(
          template.pageComponents?.map(async (c) => {
            const component = c
            const __typename = component.__typename
            const getProps = await componentsMap[component.__typename]?.getProps

            return {
              __typename,
              data: getProps
                ? await getProps(
                    component as PageComponentData<ComponentTypeNames>,
                    query
                  )
                : component,
            }
          })
        ),
      },
    }
  } else {
    defaultPageProps = {
      template: 'Unknown',
      data: null,
    }
  }

  if (defaultPageProps.template == 'Default') {
    return <DefaultComponents {...defaultPageProps.data} />
  } else {
    return <ComponentNotFound componentName={defaultPageProps.template} />
  }

  return <p>Hello</p>
}

export default DynamicPage
