import { router } from '@/configs/lib/tanstack-router';
import { RouterProvider } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <RouterProvider router={router} />
    </>
  );
};
