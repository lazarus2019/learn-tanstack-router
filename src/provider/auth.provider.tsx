import axios from 'axios';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface GetUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: GetUser | null;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthState | null>(undefined);

// const fetchUser = Effect.tryPromise({
//   try: getUsers,
//   catch: error => new Error(`Failed to fetch user: ${String(error)}`),
// });

const fetchUser = () => {
  return axios.post('https://jsonplaceholder.typicode.com/usersasdasd');
  // return new Promise<GetUser>((resolve, reject) => {
  //   setTimeout(() => {
  //     reject({});
  //   }, DUMMY_PROMISE_DELAY);
  // });
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GetUser | null>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetUser = async () => {
    try {
      const user = await fetchUser();
      console.log("🚀 ~ handleGetUser ~ user:", user);
      // setUser(user);
      // setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setUser(undefined);
      setIsAuthenticated(false);
    }
    // setIsLoading(false);
    // pipe(
    //   fetchUser,
    //   Effect.either,
    //   Effect.tap(Either.match({
    //     onRight: user => {
    //       setUser(user);
    //       setIsAuthenticated(true);
    //     },
    //     onLeft: error => {
    //       console.error(error);
    //       setUser(null);
    //       setIsAuthenticated(false);
    //     },
    //   })),
    //   Effect.tap(() => setIsLoading(false)),
    //   Effect.runPromise,
    // );
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const hasRole = (role: string) => user?.roles.includes(role) ?? false;

  const hasAnyRole = (roles: string[]) => roles.some((role) => hasRole(role));

  const hasPermission = (permission: string) =>
    user?.permissions.includes(permission) ?? false;

  const hasAnyPermission = (permissions: string[]) =>
    permissions.some((permission) => hasPermission(permission));

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      hasRole,
      hasAnyRole,
      hasPermission,
      hasAnyPermission,
    }),
    [user, isAuthenticated]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

// oxlint-disable-next-line only-export-components
export { AuthProvider, useAuth, type AuthState };
