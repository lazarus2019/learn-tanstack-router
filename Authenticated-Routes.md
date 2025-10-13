# Review example authenticated routes

## Kitchen sink

- create a auth constant with `login` method to set auth value
- passing initial auth to Router context
- root router define createRootRouteWithContext to type-safe
- use Pathless Layout routes (\_auth) to check auth status with `beforeLoad`
  - redirect to login when `loggedOut`
  - or return context with username
- protected routes get context with `useRouteContext`
- LOGIN: set auth value via `auth.login(username)` then run `router.invalidate()` to update router context
- LOGOUT: run `logout` clear auth value & invalidate router context

## Authenticated Routes

- get user from localStorage and stored in `AuthProvider`
- wrapping `InnerApp` that contains `RouterProvider` and passed down auth context from `AuthProvider`
- root router define createRootRouteWithContext to type-safe
- use Pathless Layout routes (\_auth) to check auth status with `beforeLoad`
  - redirect to login when `loggedOut`
  - or return context with username
- protected routes get context with `useRouteContext`
- LOGIN: set auth context to `AuthProvider` via `auth.login(username)` then run `router.invalidate()` to update router context
- LOGOUT: run `logout` clear auth context & invalidate router context
