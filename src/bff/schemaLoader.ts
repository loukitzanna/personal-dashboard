import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the schema file
const schemaPath = join(__dirname, 'schema.graphql');
const schemaContent = readFileSync(schemaPath, 'utf-8');
export const typeDefs = schemaContent;