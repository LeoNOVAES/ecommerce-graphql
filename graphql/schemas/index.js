const mergeGraphQLSchemas = require('merge-graphql-schemas')
const path = require('path')

const files = path.join(__dirname, './');
const { fileLoader,mergeTypes } = mergeGraphQLSchemas;

const loaded = fileLoader(files);
const schemas = mergeTypes(loaded);

module.exports = schemas;