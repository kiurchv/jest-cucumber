# jest-test-runner-cucumber

[Cucumber](https://github.com/cucumber/cucumber-js) as Jest test runner

## Usage

### Install

Install `jest` and `jest-test-runner-cucumber` using `npm`:

```sh
npm install --save-dev jest jest-test-runner-cucumber
```

Or using `yarn`:

```sh
yarn add --dev jest jest-test-runner-cucumber
```

### Add it to your Jest config

```json
{
  "moduleFileExtensions": ["feature", "js", "json", "jsx", "node"],
  "testMatch": ["**/*.feature"],
  "testRunner": "jest-test-runner-cucumber"
}
```

Alternatively you can use [`jest-preset-cucumber`](https://github.com/kiurchv/jest-cucumber/blob/master/packages/jest-preset-cucumber).
