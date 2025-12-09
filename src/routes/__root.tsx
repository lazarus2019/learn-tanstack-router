import { useAllRoutes } from '@/hooks/use-all-routes';
import type { AuthState } from '@/provider/auth.provider';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';

export const Route = createRootRouteWithContext<AuthState>()({
  component: RootLayout,
  // beforeLoad: () => {
  //   // fetching user

  //   return {
  //     user: {
  //       id: '123',
  //       name: 'Krix',
  //     },
  //   };
  // },
});

function RootLayout() {
  const routes = useAllRoutes();

  const handleLogin = async () => {
    const redirectUrl = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('https://vercel.com/');
      }, 2000);
    });

    globalThis.location.href = redirectUrl;
  };

  return (
    <React.Fragment>
      <button onClick={handleLogin}>login</button>

      <div
        style={{
          maxWidth: '800px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            textAlign: 'left',
          }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id nobis
          maiores reiciendis eveniet expedita eius modi maxime dolores, officiis
          consequuntur.
          <div
            style={{
              paddingBottom: '56.25%',
              height: '0px',
              position: 'relative',
              overflow: 'hidden',
              maxWidth: '100%',
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                maxWidth: '100%',
                maxHeight: '100%',
                aspectRatio: '16 / 9',
              }}
              allowfullscreen
              frameborder="0"
              src="https://www.youtube.com/embed/rsdYhDphRuk"
              title="[UPDATE] 더 나은 플레이를 위한 한 걸음 | 넥슨 11월 업데이트 안내"
            ></iframe>
          </div>
        </div>
      </div>

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
