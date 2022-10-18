# Website

<a href="LICENSE">
    <img src="https://img.shields.io/github/license/hdtls/website" alt="MIT License">
</a>
<a href="https://v3.vuejs.org">
    <img src="https://img.shields.io/badge/vue-next-brightgreen" alt="Vue@next">
</a>
<br>
<br>

Website is a frontend application build with [vue](https://v3.vuejs.org).
And you can find backend for this site at [swift-website-server](https://github.com/hdtls/swift-website-server.git)

## Getting Started

Webiste primarily uses vitejs as its build tools, so we recommand using that as well, by default dependencies is excluded from source control, so if you want to run code you should install them first.

```shell
git clone https://github.com/hdtls/website.git
cd website
pnpm install
```

To build & run them, run following command, replace SCRIPT_NAME with what you have define in `package.json`.

```Shell
pnpm SCRIPT_NAME
```

For example, to start core package dev server run following command:

```Shell
pnpm dev:core
```

### An alternative: using `docker compose`

Alternatively, you may want to develop or test with `docker compose`.
First make sure you have Docker installed, next run the following commands, replace SERVICE_NAME with service name that you have defined in compose file:

```Shell
docker compose -f docker/compose.yml up -d SERVICE_NAME
```

For example, to start website service run following command:

```shell
docker compose -f docker/compose.yml up -d frontend
```

This will run site in the Docker container in the background, listening on http://localhost:5173. The first time you run this command will take a few moments to compile the website.
