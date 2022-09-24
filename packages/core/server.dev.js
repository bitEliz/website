import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer } from 'vite'
import manifest from './dist/client/ssr-manifest.json' assert { type: 'json' }
;(async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  const app = express()

  app.use(express.static(path.resolve(__dirname, 'dist/client')))

  const vite = await createServer({
    logLevel: 'error',
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100
      }
    },
    appType: 'custom'
  })

  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (context) => {
    try {
      // always read fresh template in dev
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )
      template = await vite.transformIndexHtml(context.originalUrl, template)
      const renderer = await vite.ssrLoadModule('/src/entry-server.ts')

      const [appHtml, preloadLinks, state] = await renderer.render(
        context.originalUrl,
        manifest
      )

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-store-->`, state)

      context.res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.log(e.stack)
      context.res.status(500).end(e.stack)
    }
  })

  app.listen(5173, () => {
    console.log('http://localhost:5173')
  })
})()
