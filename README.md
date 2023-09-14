<h1 align="center">
<img src="src/assets/img/logo.svg" alt="BUS logo" height="196" width="400"><br/><br/>

Basic URL Shortener for Cloudflare Pages

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/aensley/bus?style=flat-square)<br/>
[![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/aensley/bus/ci.yml?branch=main&style=flat-square)](https://github.com/aensley/bus/actions/workflows/ci.yml?query=branch%3Amain)
[![Maintainability](https://api.codeclimate.com/v1/badges/6668fa5755091ffe6930/maintainability)](https://codeclimate.com/github/aensley/bus/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6668fa5755091ffe6930/test_coverage)](https://codeclimate.com/github/aensley/bus/test_coverage)

</h1>

## No-Frills Short URLs

The simplest of URL shorteners. No analytics. No complex installation.

Built on Cloudflare's blazing fast global network.

### Features

- Extremely light-weight (public site is <4KB)
- Automatic light and dark themes
- Simple, intuitive dashboard

### Example

I run my own installation of bus at <https://ensl.ee>

The following URL brings you to the bus GitHub page: <https://ensl.ee/bus>

For screenshots of the dashboard, [check out the Wiki](https://github.com/aensley/bus/wiki).

### Tech Stack

- Server-side processing: Cloudflare Pages [Functions](https://developers.cloudflare.com/pages/platform/functions/)
- Configuration: Cloudflare Pages [Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)
- Data storage: Cloudflare [KV](https://developers.cloudflare.com/workers/runtime-apis/kv/) and [D1](https://developers.cloudflare.com/d1)
- Authentication: Cloudflare [Access](https://developers.cloudflare.com/cloudflare-one/policies/access/)
- Build System: Node.js

## Installation

For installation and configuration instructions, please refer to the [Wiki](https://github.com/aensley/bus/wiki/Installation).

## Development

If you would like to customize the code or contribute to the project, please refer to the [Contributing guide](.github/CONTRIBUTING.md).
