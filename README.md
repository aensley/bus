<h1 align="center">
<img src="src/assets/img/logo.svg" alt="BUS logo" height="196" width="400"><br/><br/>

Basic URL Shortener for Cloudflare Pages

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/aensley/bus?style=flat-square)<br/>
[![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/aensley/bus/ci.yml?branch=main&style=flat-square)](https://github.com/aensley/bus/actions/workflows/ci.yml?query=branch%3Amain)
[![Maintainability](https://api.codeclimate.com/v1/badges/f62e1c65c78301dea6f8/maintainability)](https://codeclimate.com/github/aensley/bus/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f62e1c65c78301dea6f8/test_coverage)](https://codeclimate.com/github/aensley/bus/test_coverage)

</h1>

## No-Frills Short URLs

The simplest of URL shorteners. No analytics. No complex installation.

### Features

- Extremely light-weight (public site is <4KB)
- Automatic light and dark themes
- Simple, intuitive dashboard

### Example

I run my own installation of bus at <https://ensl.ee>

The following URL brings you to the bus GitHub page: <https://ensl.ee/bus>

For screenshots of the dashboard, [check out the Wiki](https://github.com/aensley/bus/wiki).

### Tech Stack

- Server-side processing: Cloudflare Pages Functions
- Configuration: Cloudflare Pages Environment Variables
- Data storage: Cloudflare KV and D1
- Build System: Node.js

## Pre-requisites

- A domain for your short URLs, e.g. `example.com`
- A Cloudflare account
- Node.js

## Installation

TBA

### Authentication

TBA

## Configuration

Configuration is performed through Cloudflare Pages' Environment variables.

### Settings

| Environment Variable | Required | Default | Description                                                                           |
| -------------------- | -------- | ------- | ------------------------------------------------------------------------------------- |
| `DOMAIN`             | **YES**  |         | The domain for your URL shortener. This will be used as the base for your short URLs. |
| `SHORT_CODE_LENGTH`  | No       | 4       | The length to use for automatically generated short-codes.                            |
| `LINK_TO_DASH`       | No       | false   | Set to true to show a link to your dashboard on the public home page.                 |

## Application Data

Shortened URLs are stored in Cloudflare's D1 and KV storage systems.
