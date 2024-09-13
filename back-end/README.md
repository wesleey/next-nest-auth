## Installation

```bash
$ yarn install
```

## Running the app

```bash
$ sudo docker-compose up
```

## Generate RSA key pairs

```bash
$ yarn run generate:keys
```
> [!Warning]
> Remember to add all private keys in `.gitignore` and **never** share these keys with others.

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
