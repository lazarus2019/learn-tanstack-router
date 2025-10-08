import { useRouter } from '@tanstack/react-router';
// Generate a random value for each param (e.g. $id → abc123)
const randomParam = () => Math.random().toString(36).slice(2, 8);

export const useAllRoutes = () => {
  const { flatRoutes } = useRouter();

  const routeEntries = Object.values(flatRoutes)
    .map((route) => {
      const path = route.fullPath;

      // Replace any `$param` or `/$` with random values
      // e.g. /users/$id/profile/$ → /users/abc123/profile/xyz987
      const filledPath = path.replace(/\$[A-Za-z0-9_]+|\$($|\/)/g, () =>
        randomParam()
      );

      return { originalPath: path, filledPath };
    })
    .sort((a, b) => a.originalPath.localeCompare(b.originalPath));

  return routeEntries;
};
