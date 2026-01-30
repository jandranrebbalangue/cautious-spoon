import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">TanStack Router + Query</p>
          <h1>Type-Safe Scaffold</h1>
          <p className="app-subtitle">
            File-based routing, validated search params, and typed data fetching.
          </p>
        </div>
        <nav className="app-nav">
          <Link to="/" className="app-link">
            Home
          </Link>
          <Link to="/login" className="app-link">
            Login
          </Link>
          <Link to="/signup" className="app-link">
            Sign up
          </Link>
          <a
            className="app-link"
            href="https://tanstack.com/query/latest"
            target="_blank"
            rel="noreferrer"
          >
            Query Docs
          </a>
          <a
            className="app-link"
            href="https://tanstack.com/router/latest"
            target="_blank"
            rel="noreferrer"
          >
            Router Docs
          </a>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
