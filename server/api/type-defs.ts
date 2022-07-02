import fs from 'fs';

const path = new URL('../../schema/schema.graphql', import.meta.url);
const typeDefs = fs.readFileSync(path, 'utf8');

export default typeDefs;
