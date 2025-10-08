import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ppp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ppp"!</div>
}
