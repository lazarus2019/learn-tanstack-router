import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$locale/about"!</div>
}
