### Demo
https://assets-code-challenge.vercel.app/

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run dev
```

### Run the tests
```bash
npm run test
```

### Build the app for production
```bash
npm run build
```

### Folder structure
- **features**: The application's main features should be placed here. Each feature has a folder containing all its domain types, services, hooks and components.
- **components**: Contains all of the project's global components and component library(If multiple teams are working on the component library, We should choose other solutions such as creating a core folder, creating a package, setting up a monorepo or switching to micro frontend.)
- **pages**: A page is the most outer layer, which can contain one or more features and is registered as the components of routes in the router configuration.
- **services**: All global services or configurations related to sending requests to the server should be placed here.
- stores
- layouts
- types
  
**Rule**: If a type, component or service is widely used, it should be in the global directories; otherwise, it should be defined near its domain under the features folder.

### About functions(src/features/Asset/AssetFunctions.ts)...
1. **nestedAssetBuilder**: It's a pure function that recursively generates the hierarchies of assets. We can write it in a declarative way(e.g. using lodash's functions or map and reduce) for better code readability, but cause the performance is essential in this case, using for loops is preferred.
2. **assetsStatisticsCalculator**: It will return an asset's statistics as expected. If it doesn't have any data, it will recursively look for children's statistics and returns an aggregated value of its children.

###  Assumptions
- Asset IDs are sequential
