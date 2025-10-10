import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/post')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/post"!
      <Outlet />
    </div>
  );
}
