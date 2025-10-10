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
})

// route-a
const pathlessLayoutARoute = createRoute({
  getParentRoute: () => pathlessLayoutRoute,
  path: 'route-a',
})
```
Main concepts same as file-based routing. See more here: https://tanstack.com/router/latest/docs/framework/react/routing/code-based-routing#routing-concepts-for-code-based-routing