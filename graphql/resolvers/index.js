const mergeGraphQLSchemas = require('merge-graphql-schemas')
const path = require('path')

const files = path.join(__dirname, './');
const { fileLoader } = mergeGraphQLSchemas;

const loaded = fileLoader(files);

module.exports = loaded;