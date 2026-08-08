import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { RouterProvider } from './router'
import App from './App'
import './index.css'

const root = document.getElementById('root')!

const tree = (
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>
)

// Every route ships as a prerendered HTML file, so the normal path is
// hydration. createRoot is the fallback for `vite dev`, where #root is empty.
if (root.firstChild) {
  hydrateRoot(root, tree)
} else {
  createRoot(root).render(tree)
}
