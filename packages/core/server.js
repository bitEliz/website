import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer } from 'vite'
import manifest from './dist/client/ssr-manifest.json' assert { type: 'json' }
;(async () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  const isProd = process.env.NODE_ENV === 'production'

  let template = isProd
    ? fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8'
      )
    : ''

  const app = express()

  let vite
  if (!isProd) {
    vite = await createServer({
      logLevel: !isProd ? 'error' : 'info',
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
  } else {
    app.use((await import('compression')).default())
    app.use(
      '/',
      (await import('serve-static')).default(
        path.resolve(__dirname, 'dist/client'),
        {
          index: false
        }
      )
    )
  }
  app.use('*', async (context) => {
    try {
      let render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(context.originalUrl, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        render = (await import('./dist/server/entry-server.js')).render
      }

      const [appHtml, preloadLinks, state] = await render(
        context.originalUrl,
        manifest
      )

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-store-->`, state)

      context.res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      context.res.status(500).end(e.stack)
    }
  })

  app.listen(5173, () => {
    console.log('http://localhost:5173')
  })
})()
