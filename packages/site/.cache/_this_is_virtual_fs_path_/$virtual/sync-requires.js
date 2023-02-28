
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/home/slanders/forta/template-snap-monorepo/packages/site/.cache/dev-404-page.js")),
  "component---src-pages-index-tsx": preferDefault(require("/home/slanders/forta/template-snap-monorepo/packages/site/src/pages/index.tsx"))
}

