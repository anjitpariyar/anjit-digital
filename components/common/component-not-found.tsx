import { FC } from 'react'

export type ComponentNotFoundProps = {
  componentName: string
}
const ComponentNotFound: FC<ComponentNotFoundProps> = ({ componentName }) => {
  return <div>component-not-found: {componentName}</div>
}

export default ComponentNotFound
