# Website

<a href="LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue" alt="Apache 2.0 License">
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
yarn
```

To build & run them, run following command, replace SCRIPT_NAME with what you have define in `package.json`.

```Shell
yarn SCRIPT_NAME
```

For example, to start a dev server run following command:

```Shell
yarn dev
```

### An alternative: using `docker-compose`

Alternatively, you may want to develop or test with `docker-compose`.
First make sure you have Docker installed, next run the following commands, replace SERVICE_NAME with service name that you have defined in docker-compose file:

```Shell
docker-compose -f docker/docker-compose.test.yml up -d SERVICE_NAME
```

For example, to start website service run following command:

```shell
docker-compose -f docker/docker-compose.test.yml up -d website
```

This will run site in the Docker container in the background, listening on http://localhost:3000. The first time you run this command will take a few moments to compile the website.
