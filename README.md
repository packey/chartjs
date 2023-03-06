# Ignite SPA Seed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Setup Azure Artifacts Authentication

This project is using an Azure Artifacts Feed as an npm registry.
To be able to install packages please follow these steps

#### Step 1

Copy the code below to your user `.npmrc`.
Note for Windows: the `.npmrc` file can be found under `C:\Users\<your username>\.npmrc`.

```
; begin auth token
//pkgs.dev.azure.com/tecan-confm-org/tecan-ui/_packaging/tecan-angular-ui-component-library/npm/registry/:username=tecan-confm-org
//pkgs.dev.azure.com/tecan-confm-org/tecan-ui/_packaging/tecan-angular-ui-component-library/npm/registry/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]
//pkgs.dev.azure.com/tecan-confm-org/tecan-ui/_packaging/tecan-angular-ui-component-library/npm/registry/:email=npm requires email to be set but doesn't use the value
//pkgs.dev.azure.com/tecan-confm-org/tecan-ui/_packaging/tecan-angular-ui-component-library/npm/:username=tecan-confm-org
//pkgs.dev.azure.com/tecan-confm-org/tecan-ui/_packaging/tecan-angular-ui-component-library/npm/:_password=[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]
//pkgs.dev.azure.com/tecan-confm-org/tecan-ui/_packaging/tecan-angular-ui-component-library/npm/:email=npm requires email to be set but doesn't use the value
; end auth token
```

#### Step 2

Generate a [Personal Access Token](https://dev.azure.com/tecan-confm-org/_details/security/tokens) with Packaging read & write scopes.

#### Step 3

Base64 encode the personal access token from **Step 2**.

One safe and secure method of Base64 encoding a string is to:

1. Open Chrome devtools console and run

```
btoa('[PERSONAL_ACCESS_TOKEN]')
```

2. Paste your personal access token value and press Enter/Return

3. Copy the Base64 encoded value

#### Step 4

Replace both `[BASE64_ENCODED_PERSONAL_ACCESS_TOKEN]` values in your user `.npmrc` file with your personal access token from **Step 3**.

#### Step 5

Delete your project `package-lock.json` file and `node_modules` folder, if present.
Run `npm install`.

## Development server

Run `npm run start` for a dev server. Navigate to `https://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Lint

Run `npm run lint:ci` to run eslint.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/ignite-spa` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `npm run test:watch` to execute the unit tests in Watch mode (development purposes).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
