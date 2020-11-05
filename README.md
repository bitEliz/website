# Website

This is the front-end repository for the website. 
And you can find back-end at [swift-website-server](https://github.com/littlerkie/swift-website-server.git)

## Getting started
This site is built with [Nuxt.js](https://github.com/nuxt/nuxt.js). First, make sure you have NPM installed. Next, start the development server:

```bash
npm run serve
```

Then open http://localhost:3000/ in your browser.

## Docker setup
```bash
docker-compose -f docker/docker-compose up -d
```
This will run site in the Docker container in the background, listening on http://localhost:3000. The first time you run this command will take a few moments to compile the website.