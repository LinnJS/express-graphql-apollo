# Express Graphql Apollo with Custom GraphQL Client

  This is a monorepo meant to be a proof of concept on a production ready GraphQL server built with Apollo Server and Express. It also includes a custom GraphQL client built with Apollo Client which will eventually be refactored into React Query as a experiment.

  I am building this project to do a deep dive on modern GraphQL tooling with TypeScript and to learn more about the Apollo ecosystem.

  I am also curious to see how Express/Apollo compare to a NestJS Apollo GraphQL server.

## Technology Stack

### Monorepo Tooling
  - Lerna 
  - husky
  - lint-staged

### Tooling for Server
  - TypeScript
  - NodeJS 
  - Express
  - Apollo Server
  - Apollo Client
  - GraphQL Code Generators with TypeScript support

## Tooling for GraphQL Client
  - TypeScript
  - NextJS (React)
  - Apollo Client (Refactoring to React Query later)
  - GraphQL Code Generators with TypeScript support

## Getting Started

### Prerequisites

  - NodeJS (NPM)

If you are on MacOS and do not have node installed you can install via homebrew

```bash
$  brew install node
```

or visit [NodeJS Docs](https://nodejs.org/en/)

### Installing Repository Dependencies

```bash
$  npm install
```

### Run apps in development mode concurrently

```bash
$  npm run dev
```

### Run app build and run production mode

```bash
$  npm run build && npm run start
```

### Single app builds with the following commands

```bash
$  npm run build:server
$  npm run build:client
```


## License
MIT License


