import type { CodegenConfig } from '@graphql-codegen/cli';
import { join } from 'path';

const config: CodegenConfig = {
  schema: join(__dirname, 'schema.graphql'),
  documents: join(__dirname, '**/*.ts'),
  ignoreNoDocuments: true, // For better error messages
  generates: {
    [join(__dirname, 'generated/graphql.ts')]: {
      plugins: [
        'typescript',
        'typescript-resolvers'
      ],
      config: {
        useIndexSignature: true,
        contextType: './context#Context',
        enumsAsTypes: true,
        skipTypename: true
      }
    }
  }
};

export default config; 