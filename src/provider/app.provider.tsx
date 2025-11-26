import { router } from '@/configs/lib/tanstack-router';
import { RouterProvider } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import { AuthProvider, useAuth } from './auth.provider';

const InnerApp = () => {
  const context = useAuth();
  return <RouterProvider router={router} context={context} />;
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      {children}
      <InnerApp />
    </AuthProvider>
  );
};
