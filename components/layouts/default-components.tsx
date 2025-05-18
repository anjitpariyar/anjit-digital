import { NextPage } from 'next'
import { componentsMap, ComponentTypeNames } from './default-components-map'

export type PageComponent = {
  __typename: ComponentTypeNames
  data?: unknown
}

export type DefaultPageProps = {
  components: PageComponent[]
}
/**
 * this will loop components render the components based on the __typename
 * @param components
 * @returns {JSX.Element}
 */
const DefaultComponents: NextPage<DefaultPageProps> = ({ components }) => {
  return (
    <>
      {components.map((component, i) => {
        const __typename = component.__typename
        if (__typename in componentsMap) {
          const Component = componentsMap[__typename]!.Component
          const data = component.data
          if (data) {
            return <Component {...data} key={i} />
          } else {
            return null
          }
        } else {
          return null
        }
      })}
    </>
  )
}

export default DefaultComponents
