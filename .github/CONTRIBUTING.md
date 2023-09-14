# Contributing

## Standards

All code in this repository must pass [prettier](https://prettier.io/) linting and [ts-standard](https://github.com/standard/ts-standard). These standards are enforced by [`npm test`](#run-unit-tests), which in turn is a required pre-commit hook.

Any contributions which do not pass the coding standards or unit tests will not be accepted.

## Commit Messages

Commit messages must follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) standard.

## Repository Layout

| Folder     | Contents                    |
| ---------- | --------------------------- |
| / (root)   | Project metadata files      |
| /.github/  | GitHub metadata files       |
| /.vscode/  | Visual Studio Code settings |
| /function/ | Cloudflare Pages Functions  |
| /src/      | Source code                 |
| /tests/    | Unit and integration tests  |

## Style Guide

See: <https://github.com/aensley/bus-assets>

## Setup

This step will install dependencies and setup commit hooks.

```
npm run setup
```

## Update

```
npm update
```

## Run Unit Tests

```
npm test
```

## Build

To build the application, run:

```ShellSession
DOMAIN=localhost npm run build
```

## Watch

To automaticaly build the site when source files change (useful during development), run:

```ShellSession
DOMAIN=localhost npm run watch
```

The session can be ended by pressing `CTRL+C`.

### Format

To automatically format source code (required before committing), run:

```ShellSession
npm run format
```
