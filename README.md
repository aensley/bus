<h1 align="center">
<img src="src/assets/img/logo.svg" alt="BUS logo" height="196" width="400"><br/><br/>

Basic URL Shortener for Cloudflare Pages

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/aensley/bus-cf?style=flat-square)<br/>
[![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/aensley/bus-cf/ci.yml?branch=main&style=flat-square)](https://github.com/aensley/bus-cf/actions/workflows/ci.yml?query=branch%3Amain)
[![Maintainability](https://api.codeclimate.com/v1/badges/f62e1c65c78301dea6f8/maintainability)](https://codeclimate.com/github/aensley/bus-cf/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f62e1c65c78301dea6f8/test_coverage)](https://codeclimate.com/github/aensley/bus-cf/test_coverage)

</h1>

## No-Frills Short URLs

The simplest of URL shorteners. No analytics. No complex installation.

### Features

- Extremely light-weight (public site is <4KB)
- Automatic light and dark themes
- Simple, intuitive dashboard

### Example

I run my own installation of BUS-CF at <https://ensl.ee>

The following URL brings you to the BUS-CF GitHub page: <https://ensl.ee/bus-cf>

For screenshots of the dashboard, [check out the Wiki](https://github.com/aensley/bus-cf/wiki).

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

| Environment Variable | Required | Default | Description                                                |
| -------------------- | -------- | ------- | ---------------------------------------------------------- |
| `short-code-length`  | No       | 4       | The length to use for automatically generated short-codes. |
| `link-to-dash`       | No       | false   | Set to true to show a link to your                         |

## Application Data

Shortened URLs are stored in Cloudflare's D1 and KV storage systems.
