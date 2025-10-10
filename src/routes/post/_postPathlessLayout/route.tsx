import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/post/_postPathlessLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/post/_postPathlessLayout"!
      <Outlet />
    </div>
  );
}
