import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAllRoutes } from '@/hooks/use-all-routes';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const routes = useAllRoutes();

  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <ul className="list-disc pl-5 space-y-1">
        {routes.map(({ originalPath, filledPath }) => (
          <li key={originalPath}>
            <Link to={filledPath} className="text-blue-600 hover:underline">
              {originalPath}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
