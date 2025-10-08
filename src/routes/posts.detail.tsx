import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/detail')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/posts/detail"!</div>
}
