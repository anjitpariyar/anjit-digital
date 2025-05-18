import path from 'path'

import { type CodegenConfig } from '@graphql-codegen/cli'
import dotenv, { DotenvConfigOptions } from 'dotenv'

const dev = process.env.NODE_ENV !== 'production'
const options: DotenvConfigOptions = {}
if (dev) {
  options.path = path.resolve(__dirname, '.env.development')
} else {
  options.path = path.resolve(__dirname, '.env.production')
}

dotenv.config(options)
dotenv.config({
  path: path.resolve(__dirname, '.env.local'),
  override: true,
})

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  documents: ['graphql/**/*.graphql', 'components/**/*.graphql'],
  generates: {
    'graphql/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
}

export default config
