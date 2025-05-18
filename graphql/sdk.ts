import { GraphQLClient } from 'graphql-request'

import { getSdk } from './types'

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!)
const sdk = getSdk(client)

export default sdk
