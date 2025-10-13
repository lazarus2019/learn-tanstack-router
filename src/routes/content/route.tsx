import {
  createFileRoute,
  Outlet,
  useRouteContext,
  useRouter,
} from '@tanstack/react-router';

export const Route = createFileRoute('/content')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    console.log('context in /content', context);
    return {
      // the parent context will spread here
      content: 'This is content from /content route',
    };
  },
});

function RouteComponent() {
  const rootCtx = useRouteContext({ from: '__root__' });
  console.log('🚀 ~ RouteComponent ~ rootCtx:', rootCtx);
  const contentCtx = useRouteContext({ from: '/content' });
  console.log('🚀 ~ RouteComponent ~ contentCtx:', contentCtx);
  const router = useRouter()


  return (
    <div>
      Hello "/content"!
      <Outlet />
    </div>
  );
}
