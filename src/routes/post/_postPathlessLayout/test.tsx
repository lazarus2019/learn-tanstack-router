import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/post/_postPathlessLayout/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/post/_postPathlessLayout/test"!</div>;
}
