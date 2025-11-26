import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/testing/redirect-sso-with-location-href'
)({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      const redirectUrl = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('https://vercel.com/');
        }, 2000);
      });

      globalThis.location.href = redirectUrl;
    }
  },
});

function RouteComponent() {
  return <div>Hello "/testing/redirect-sso-with-location-href"!</div>;
}
