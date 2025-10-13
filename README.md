# Tanstack router

## Route Concepts

### Basic route

=> match path exactly
Path:

- /about
- /settings
- /settings/notifications

Directories routes & flat routes & mixed 2 of them
Directories routes (nested tree match up URL):

- routes/posts/index.tsx => posts/
- routes/settings/index.tsx => settings/
- routes/settings/profile.tsx => settings/profile
- routes/files/$.tsx => files/(dynamic)

Flat routes (flat all components):

- routes/posts.index.tsx => posts/
- routes/settings.index.tsx => settings/
- routes/settings.profile.tsx => settings/profile
- routes/files.$.tsx => files/(dynamic)

Path Normalized

- about, /about, about/, /about/ => about
- $, /$, $/, /$/ => $

### Index route

=> match exactly and no child route is matched, this route present for home/list page of dynamic route segment
Path:

- /posts

### Dynamic route segments

=> route start with $, match exactly
=> dynamic by params
Path:

- /posts/$postId => params: postId
- /posts/$postId/$versionId => params: postId, versionId

### Splat/Catch-All routes ($)

=> route with $, catch all URL after $ (/files/documents/hello-world, /files/hello-world)
=> param: \_splat
Path:

- files/$
- files/document/content => \_splat: document/content

### Optional path parameters (-)

=> define route segment may/may not present in URL
=> match the base with/without segments
=> syntax: {-$fileId}
Path:

- /posts/{-$category}/{-$slug}: category & slug is optional

### Layout route

=> wrap child routes with components and logic
=> if not using <Outlet> the content will be appear only Layout route

Use cases:

- Layout component
- Run loader before display child routes
- Validate & providing search params to child routes
- Fallback error/pending component

Path flat files:

- /app => <AppLayout> (app.tsx)
- /app/dashboard => <AppLayout><Dashboard> (app.dashboard.tsx)

Path nested files:

- /app => <AppLayout> (app/route.tsx)
- /app/dashboard => <AppLayout><Dashboard> (app/dashboard.tsx)

Path nested files with dynamic route segments:

- app/users/$userId => <AppLayout><UserIdIndex> (app/users/$userId/route.tsx + app/users/$userId/index.tsx)
- app/users/$userId/edit => <AppLayout><UserEdit> (app/users/$userId/edit.tsx)

### Pathless Layout routes

=> same benefit like Layout route but not required matching path in URL
=> syntax (_) => pathless
=> it not index path
=> not support dynamic route segment (_$postId)

Path:

- / => <Index> (index.tsx)
- /a => <PathlessLayout><A> (\_pathlessLayout.tsx + \_pathlessLayout.a.tsx)
- /b => <PathlessLayout><B> (\_pathlessLayout.tsx + \_pathlessLayout.b.tsx)

Path separate with dynamic route segments

- /$postId => <PostId> (index.tsx)
- /content => <PathlessLayout><Content> (\_pathlessLayout/route.tsx + \_pathlessLayout/content.tsx)

routes/
├── $postId/
├── \_postPathlessLayout/ ✅
│ ├── ...

### Non-Nested routes

=> Only support file-based with flat files
=> suffixing route segment with (\_) => un-nest from it parent

routes/
├── posts.tsx
├── posts.$postId.tsx (nested route under posts.tsx)
├── posts_.$postId.edit.tsx (not share posts prefix)

Path:

- /posts => <Posts>
- /posts/123 => <Posts><Post postId="123">
- /posts/123/edit => <PostEditor postId="123">

### Excluding Files & Folder from routes

=> prefix with syntax (-)
=> ignore generate route for files and folder (-temp.tsx, -components/)
=> all routes will not be add to the routeTree.gen.ts

routes/
├── posts.tsx
├── -posts-table.tsx // 👈🏼 ignored
├── -components/ // 👈🏼 ignored
│ ├── header.tsx // 👈🏼 ignored
│ ├── footer.tsx // 👈🏼 ignored
│ ├── ...

### Pathless Route Group Directories

=> Group related routes together
=> Not affect to route tree or component tree

routes/
├── index.tsx
├── (app)/
│ ├── dashboard.tsx
│ ├── settings.tsx
│ ├── users.tsx
├── (auth)/
│ ├── login.tsx
│ ├── register.tsx

Path:

- / => <Index>
- /dashboard => <Dashboard>
- /settings => <Settings>
- /users => <Users>
- /login => <Login>
- /register => <Register>

## Route trees

Support file-based routing & code-based routing

more information see here: https://tanstack.com/router/latest/docs/framework/react/routing/route-trees

## Route Matching

Sorted by order:

- Index Routes
- Static Routes (most => least specific)
- Dynamic Routes (longest => shortest)
- Splat/Wildcard Routes

=> when enter a route => sorted defined routes => check matching => stop at first matched

```
Before:
Root
  - blog
    - $postId
    - /
    - new
  - /
  - *
  - about
  - about/us
```

```
After:
Root
  - /
  - about/us
  - about
  - blog
    - /
    - new
    - $postId
  - *
```

## File-based routing

Benefits:

- Simplify: Easy to understand for new & experienced dev
- Organization: Routes mirrors URL structure
- Scalability: Easy to add new routes and maintain, support plugin to generate whole page config when create a file
- Code-Splitting: Automatically code-split routes => performance
- Type-Safety: Generating type linkages routes, hard when process with code-based routing
- Consistency: Enforce consistent structure routes, easy update/move to other project

## Virtual File Routes

See more: https://tanstack.com/router/latest/docs/framework/react/routing/virtual-file-routes

## Code-Based Routing

```tsx
import { createRootRoute, createRoute } from '@tanstack/react-router';

const rootRoute = createRootRoute();

// /
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

// /posts
const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'posts',
});

// posts/
const postsIndexRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '/',
});

// posts/$postId
const postRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '$postId',
});

// posts/$postId/edit
const postEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'posts/$postId/edit',
});

// files/$
const filesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'files/$',
});

// no need path prop
const pathlessLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'pathlessLayout',
});

// route-a
const pathlessLayoutARoute = createRoute({
  getParentRoute: () => pathlessLayoutRoute,
  path: 'route-a',
});
```

Main concepts same as file-based routing. See more here: https://tanstack.com/router/latest/docs/framework/react/routing/code-based-routing#routing-concepts-for-code-based-routing

## File Naming Conventions

## Router Context

- Dependency Injection: supply dependencies (loader, data fetching client, mutation service) once and all child routes can access and use
- Breadcrumbs: parent context can access inside child routes cause it merged by each layers. Child route can override context itself and using for breadcrumb.
- Dynamic meta tag management: attach meta tags for each route's context like breadcrumb => dynamic page meta tags

### Typed Router Context (type-safe for router context)

- Use `createRootRouteWithContext<ContextType>({routeOptions})` instead of `createRootRoute({routeOptions})`

```typescript
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router';

interface MyRouterContext {
  user: User;
}

// Use the routerContext to create your root route
const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: App,
});

const routeTree = rootRoute.addChildren([
  // ...
]);

// Use the routerContext to create your router
const router = createRouter({
  routeTree,
});
```

### Passing the initial Router Context

- Passing prop context at instantiation time through `createRouter`
- Context have required properties => type error
- All Context properties are optional => default context is `{}`
- Invalidate context state through `useRouter()` => recompute context for all routes

```typescript
import { createRouter } from '@tanstack/react-router';

// Use the routerContext you created to create your router
const router = createRouter({
  routeTree,
  context: {
    user: {
      id: '123',
      name: 'John Doe',
    },
  },
});
```

```typescript
const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (shouldInvalidate) {
      router.invalidate();
    }
  }, []);
};
```

### Using the Router Context

- Access from route definitions through `loader` and `beforeLoad` (`beforeLoad` run before `loader`)
- High recommended inject data fetching & mutation implement in context
- Add external library like tanstack query

```typescript
const fetchTodosByUserId = async ({ userId }) => {
  const response = await fetch(`/api/todos?userId=${userId}`);
  const data = await response.json();
  return data;
};

const queryClient = new QueryClient({});

const router = createRouter({
  routeTree: rootRoute,
  context: {
    userId: '123',
    fetchTodosByUserId,
    queryClient, // add external library
  },
});

// src/routes/todos.tsx
export const Route = createFileRoute('/todos')({
  component: Todos,
  loader: ({ context }) => context.fetchTodosByUserId(context.userId), // access context
  beforeLoad: ({ context }) => {
    // access & modified context
    console.log(context);
    context.queryClient.ensureQueryData({});
    return {
      // parent context will be spreads here
      newProp: 'hello world', // additional context
    };
  },
});
```

### Use with React Context/Hooks

- Can't use React Context & Hooks inside `beforeLoad` and `loader` cause **Rules of Hooks** => router context
- Can passing context before `<RouterProvider>` is render => React-land, satisfy **Rules of Hooks**

```tsx
// src/routes/__root.tsx
// First, make sure the context for the root route is typed
import { createRootRouteWithContext } from '@tanstack/react-router';
import { useNetworkStrength } from '@/hooks/useNetworkStrength';

interface MyRouterContext {
  networkStrength: ReturnType<typeof useNetworkStrength>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: App,
});

// src/router.tsx
import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    networkStrength: undefined!, // We'll set this in React-land
  },
});

// src/main.tsx
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

import { useNetworkStrength } from '@/hooks/useNetworkStrength';

function App() {
  const networkStrength = useNetworkStrength();
  // Inject the returned value from the hook into the router context
  return <RouterProvider router={router} context={{ networkStrength }} />;
}

// src/routes/posts.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts')({
  component: Posts,
  loader: ({ context }) => {
    if (context.networkStrength === 'STRONG') {
      // Do something
    }
  },
});
```

### Modified the Router Context

- Child routes receive merged context from it parent
- Child routes available override the parent context => it's child routes will receive the override

```typescript
// src/routes/__root.tsx
import { createRootRouteWithContext } from '@tanstack/react-router';
interface MyRouterContext {
  foo: boolean;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: App,
});

// src/router.tsx
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: {
    foo: true,
  },
});

// src/routes/todos.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/todos')({
  component: Todos,
  beforeLoad: () => {
    return {
      bar: true,
    };
  },
  loader: ({ context }) => {
    context.foo; // true
    context.bar; // true
  },
});
```

### Processing Accumulated Route Context

- Cause each child route can override the context => dynamic data per page data

```typescript
// src/routes/__root
export const Route = createFileRoute('/app/content')({
  beforeLoad: () => {
    return {
      getTitle: () => 'Content Page',
    };
  },
  component: SettingsPage,
});

// src/routes/__root
export const Route = createRootRoute({
  component: () => {
    const matches = useRouterState({ select: (s) => s.matches });
    // access src/routes/__root/content/$contentId.tsx => matches = [__root, content, $contentId]

    const breadcrumbs = matches
      .filter((match) => match.context.getTitle)
      .map(({ pathname, context }) => {
        return {
          title: context.getTitle() ?? 'My App',
          path: pathname,
        };
      });
  },
});
```

## Not Found Errors

- See document here: https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors

## Authenticated Routes

- `beforeLoad` run before `loader`, those functions receive same arguments
- `beforeLoad` run before any it's child routes => middleware before load child routes
- `beforeLoad` throw error => not loading children
- `beforeLoad` run in relative orders to these other route loading functions:
  - Route Matching (Top-Down) (make sure URL valid)
    - `route.params.parse`
    - `route.validateSearch`
  - Route Loading (include Preloading)qqqqqqqqqqqqqqqqqqqqqqqq
    - `route.beforeLoad`q
    - `route.onError`
  - Route Loading (parallel) (preload component, fetch data)
    - `route.component.preload?`
    - `route.load`

### Redirecting

- Redirecting to login page with `throw a redirect()`

```typescript
// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
        // replace: true // replace current history instead of add new one
      });
    }
  },
});
```

### Non-Redirecting Authentication

- Render other component instead of redirect, keep user on same page

```tsx
// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  component: () => {
    if (!isAuthenticated()) {
      return <Login />;
    }

    return <Outlet />;
  },
});
```

### Authentication using React Context/Hooks

- Passing `auth` information to router context
- Access context from `beforeLoad` and checking to redirecting to Login route

```tsx
// src/routes/__root.tsx
import { createRootRouteWithContext } from '@tanstack/react-router';
interface MyRouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});

// src/router.tsx
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    auth: undefined!,
  },
});

// src/App.tsx
import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider, useAuth } from './auth';
import { router } from './router';

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

// src/routes/dashboard.route.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
```

### Related How-To Guides

For detailed, step-by-step implementation guides, see:

- [How to Set Up Basic Authentication](https://tanstack.com/router/latest/docs/framework/react/how-to/setup-authentication) - Complete setup with React Context and protected routes
- [How to Integrate Authentication Providers](https://tanstack.com/router/latest/docs/framework/react/how-to/setup-auth-providers) - Use Auth0, Clerk, or Supabase
- [How to Set Up Role-Based Access Control](https://tanstack.com/router/latest/docs/framework/react/how-to/setup-rbac) - Implement permissions and role-based routing

### Examples

Working authentication examples are available in the repository:

- [Basic Authentication Example](https://github.com/TanStack/router/tree/main/examples/react/authenticated-routes) - Simple authentication with context
- [Firebase Authentication](https://github.com/TanStack/router/tree/main/examples/react/authenticated-routes-firebase) - Firebase Auth integration
- [TanStack Start Auth Examples](https://github.com/TanStack/router/tree/main/examples/react) - Various auth implementations with TanStack Start

## Render Optimizations

- Optimize ensure components only re-render when necessary

### structure sharing

### fine-grained selectors

### structural shading with fine-grained selectors

