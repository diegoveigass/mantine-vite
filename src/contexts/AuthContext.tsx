import { createContext, ReactNode, useEffect, useState } from 'react';

export const AuthContext = createContext({} as AuthContextProps);

type AuthContextProps = {
  user: User | undefined;
  handleSignIn: (name: string, email: string) => void;
  handleSignOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  name: string;
  email: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function loadStorageData() {
      const storagedName = localStorage.getItem('@mantine-vite:username');
      const storagedEmail = localStorage.getItem('@mantine-vite:email');

      if (storagedEmail && storagedName) {
        setUser({
          name: storagedName,
          email: storagedEmail,
        });
      }
    }
    loadStorageData();
  }, []);

  function handleSignIn(name: string, email: string) {
    setUser({
      name,
      email,
    });

    localStorage.setItem('@mantine-vite:username', name);
    localStorage.setItem('@mantine-vite:email', email);
  }

  function handleSignOut() {
    setUser(undefined);
    localStorage.removeItem('@mantine-vite:username');
    localStorage.removeItem('@mantine-vite:email');
  }

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
