import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

import { PageComponentsArray } from '@/graphql/utils'
import { DeepRequired, PageQuery } from '@/graphql/utils'

/**
 * This is a collection of types for the default-components.tsx
 */

type AllDefaultTemplates = PageComponentsArray
type PageComponents = DeepRequired<AllDefaultTemplates>
type ComponentTypeNames = PageComponentsArray['__typename']

export type PageComponentData<T extends ComponentTypeNames> = Extract<
  PageComponents,
  { __typename?: T }
>

type GetPropsFunction<T extends ComponentTypeNames> = (
  // eslint-disable-next-line no-unused-vars
  component: PageComponentData<T>,
  // eslint-disable-next-line no-unused-vars
  global: PageQuery
) => Promise<unknown>

type Components = Record<
  ComponentTypeNames,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component: ComponentType<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProps?: Promise<GetPropsFunction<any>>
  }
>

const componentsMap: Partial<Components> = {
  // home page
  PageComponentsPageComponentsBannerHomepageLayout: {
    Component: dynamic(() => import('@/components/page/home/banner')),
    getProps: import('@/components/page/home/banner').then(
      (mod) => mod.getProps
    ),
  },

  PageComponentsPageComponentsLessonSectionLayout: {
    Component: dynamic(() => import('@/components/page/home/lesson')),
    getProps: import('@/components/page/home/lesson').then(
      (mod) => mod.getProps
    ),
  },

  // will add more
}

export type { Components, ComponentTypeNames, GetPropsFunction, PageComponents }

export { componentsMap }
