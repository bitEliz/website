import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import manifest from './dist/client/ssr-manifest.json' assert { type: 'json' }

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  let template = fs.readFileSync(
    path.resolve(__dirname, 'dist/client/index.html'),
    'utf-8'
  )

  const app = express()

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

  app.use('*', async (context) => {
    try {
      const renderer = await import('./dist/server/entry-server.js')

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
      console.error(e)
      context.res.status(500).end(e.stack)
    }
  })

  app.listen(5173, () => {
    console.info('server start and listen on http://127.0.0.1:5173')
  })
}

try {
  main()
} catch (error) {
  console.error(error)
  process.exit(1)
}
