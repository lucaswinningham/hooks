# Bare React App

## Recreation

First,

```sh
mkdir bare-react-app
cd bare-react-app
git init
touch .gitignore README.md
```

`.gitignore`

```.gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

```

then,

```sh
yarn init --yes --install=classic
rm -rf .yarn .yarnrc.yml
yarn add html-webpack-plugin react react-dom webpack webpack-dev-server
yarn add @babel/cli @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/runtime @types/node @types/react @types/react-dom babel-loader path ts-loader ts-node typescript webpack-cli --dev
# npx check-peer-dependencies
```

then,

```sh
mkdir public
touch public/index.html
```

`public/index.html`

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <!-- <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> -->
    <!-- <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> -->

    <title>Bare React App</title>
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

then,

```sh
mkdir -p src/App
touch src/App/App.tsx
touch src/App/index.ts
```

`src/App/App.tsx`

```tsx
export const App = () => (
  <h1>Hello world!</h1>
);

```

`src/App/index.ts`

```ts
export { App } from './App';

```

then,

```sh
touch index.tsx
```

`index.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

```

then,

```sh
touch webpack.config.ts
```

`webpack.config.ts`

```ts
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { type Configuration } from 'webpack';
import { type Configuration as DevServerConfiguration  } from 'webpack-dev-server';

const devServer: DevServerConfiguration = {
  port: '9500',
  static: ['./public'],
  open: true,
  hot: true,
  liveReload: true,
};

const config: Configuration = {
  mode: 'development', 
  entry: './index.tsx', 
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  target: 'web',
  devServer,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],
};

export default config;

```

then,

```sh
touch .babelrc
```

`.babelrc`

```json
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      { "runtime": "automatic" }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}

```

`package.json`

```json
{
  "scripts": {
    "start": "webpack-dev-server --config webpack.config.ts",
    "build": "webpack --config webpack.config.ts",
    "typecheck": "tsc"
  },
  ...
}

```

then,

```sh
touch tsconfig.json
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "target": "es2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "allowJs": true,
    "jsx": "react-jsx",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts",
  ],
}

```

then,

```sh
yarn start
```

and we should see

![Successfully running app]()
