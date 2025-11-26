import { createFileRoute, redirect } from '@tanstack/react-router';

const Route = createFileRoute('/testing/redirect-sso-with-replace')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      const redirectUrl = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('https://vercel.com/');
        }, 2000);
      });

      throw redirect({
        href: redirectUrl,
      });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/$locale/testing/redirect-sso-with-replace"!</div>;
}

export { Route };
