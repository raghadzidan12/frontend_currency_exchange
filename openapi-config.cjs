const infiniteScrollApis = ["NotificationsList"];

const config = {
  schemaFile: "http://localhost:3000/docs-json", // Path to your downloaded OpenAPI spec
  apiFile: "./src/api/api-store.ts", // Path to the empty API slice
  apiImport: "Api", // Import name from emptyApi.ts
  outputFile: "./src/api/apis.ts", // Where the generated API will be saved
  exportName: "apis", // Name of the exported API
  hooks: { queries: true, lazyQueries: true, mutations: true }, // Generate React hooks
  useEnumType: true, // Use enums for types
  // enumPrefix: "Api", // Add this to prefix enum values with the API name
  // get enums exactly same from schema
  enumNaming: "original", // Preserve exact enum names

  tag: true, // Generate tags for endpoints
  
};

module.exports = config;
