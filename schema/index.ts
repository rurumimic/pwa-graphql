import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { makeSchema } from '@nexus/schema'
import path from 'path'

import { Query } from './Query'
import { Mutation } from './Mutation'
import { User } from './User'
import { Profile } from './Profile'
import { Post } from './Post'

const PROJECT_DIRNAME: string =
  typeof process.env.PROJECT_DIRNAME !== 'undefined' ?
    process.env.PROJECT_DIRNAME : path.join(__dirname, '..')

export default makeSchema({
  types: [Query, Mutation, User, Profile, Post],
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: path.join(
      PROJECT_DIRNAME,
      'node_modules/@types/nexus-typegen/index.d.ts'
    ),
    schema: path.join(
      PROJECT_DIRNAME,
      'apollo/schema.graphql'
    ),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '.prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})