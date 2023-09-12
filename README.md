<h1 align="center">
<img src="src/img/logo.svg" alt="BUS logo" height="196" width="400"><br/><br/>

Basic URL Shortener for Cloudflare Pages

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/aensley/bus?style=flat-square)
[![GitHub Workflow Status (main)](https://img.shields.io/github/workflow/status/aensley/bus/ci/main?style=flat-square)](https://github.com/aensley/bus/actions/workflows/ci.yml?query=branch%3Amain)

</h1>

## No-Frills Short URLs

The simplest of URL shorteners for self-hosted users. No analytics. No complex installation.

### Features

- Extremely light-weight (public site is <4KB)
- Automatic light and dark themes
- Simple, intuitive dashboard

### Example

I run my own installation of BUS at <https://ensl.ee>

The following URL brings you to the BUS GitHub page: <https://ensl.ee/bus>

For screenshots of the dashboard, [check out the Wiki](https://github.com/aensley/bus/wiki).

### Tech Stack

- Server-side processing: PHP
- Configuration: [Single JSON file](#envjson)
- Data storage: [Single JSON file](#datajson)
- Build System: Node.js

## Pre-requisites

- A domain for your short URLs, e.g. `example.com`
- A seperate domain for the dashboard to manage short URLs, e.g. `dash.example.com`
- A web server like Apache or NGINX
- Node.js
- PHP
- HTTPS Certificates for each domain

## Installation

1. Clone the repository

   ```ShellSession
   $ git clone https://github.com/aensley/bus
   ```

1. Install dependencies

   ```ShellSession
   $ npm ci
   ```

1. [Configure your installation](#configuration)

1. Build the site

   ```ShellSession
   $ npm run build
   ```

### Updates

1. Update the repository

   ```ShellSession
   $ git pull
   ```

1. Update dependencies

   ```ShellSession
   $ npm ci
   ```

1. Rebuild the site

   ```ShellSession
   $ npm run build
   ```

### Server Setup

The built site will be available in two directories:

1. **`dist/public/`** - This is for the domain hosting BUS itself, e.g. https://example.com
1. **`dist/dash`/** - This is for the domain hosting the BUS dashboard, where the short URLs will be created and managed, e.g. https://dash.example.com

Example configs are included for apache for both the [public](examples/apache-site-public.conf) and [dash](examples/apache-site-dash.conf) sites.

#### Authentication

You will need to setup some form of authentication in front of the dashboard domain. The [example config](examples/apache-site-dash.conf) uses basic auth.

## Configuration

### .env.json

In the `dist/` folder, you must create a `.env.json` file with the site configuration.

[An example `.env.json` file](examples/.env.json) is included for reference.

#### Settings

| Setting             | Required | Default | Description                                                                           |
| ------------------- | -------- | ------- | ------------------------------------------------------------------------------------- |
| `public-domain`     | **Yes**  | None    | The domain for your URL shortener. This will be used as the base for your short URLs. |
| `dash-domain`       | **Yes**  | None    | The domain for your dashboard to create and manage short URLs.                        |
| `short-code-length` | No       | 4       | The length to use for automatically generated short-codes.                            |
| `link-to-dash`      | No       | false   | Set to true to show a link to your                                                    |

## Application Data

The only data stored by this application are the short URLs, the long URLs they link to, and the timestamp of when they were created. All of this is stored in a single JSON file.

### .data.json

In the `dist/` folder you will need to create a `.data.json` file. The `.data.json` file must be writeable by the web server user.

This file contains a JSON-formatted list of all short URLs added to your site. Each entry has the short-code as its key and the following properties:

- **`l`**: The long URL.
- **`c`**: Timestamp representing when the short URL was created.

**If you lose this file, you lose your short URLs**. It is a good idea to regularly backup this file.
