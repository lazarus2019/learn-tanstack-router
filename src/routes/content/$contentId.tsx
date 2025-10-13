import {
  createFileRoute,
  useLoaderData,
  useRouteContext,
} from '@tanstack/react-router';

export const Route = createFileRoute('/content/$contentId')({
  component: RouteComponent,
  loader: ({ context }) => {
    console.log('🚀 ~ RouteComponent ~ context:', context);

    return {
      contentDetail: {
        id: '1',
        title: 'Content Title',
        body: 'This is the body of the content.',
      },
    };
  },
});

function RouteComponent() {
  const rootCtx = useRouteContext({ from: '__root__' });
  console.log('🚀 ~ RouteComponent ~ rootCtx:', rootCtx);
  const contentCtx = useRouteContext({ from: '/content' });
  console.log('🚀 ~ RouteComponent ~ contentCtx:', contentCtx);

  const dataLoader = useLoaderData({ from: '/content/$contentId' });
  console.log('🚀 ~ RouteComponent ~ dataLoader:', dataLoader);

  return <div>Hello "/content/$contentId"!</div>;
}
