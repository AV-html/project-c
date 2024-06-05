const config = {
  schemaFile: 'http://vm4743732.34ssd.had.wf:3001/swagger-json',
  apiFile: './src/modules/auth/auth-api.ts',
  apiImport: 'authApi',

  outputFile: './src/modules/auth/auth-api-gen.ts',
  filteredEndPoints: [/auth/i],
  exportName: 'generatedApi',
  hooks: true
}

export default config
