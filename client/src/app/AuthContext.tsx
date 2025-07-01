import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
      setIsAdmin(parsedUser.isAdmin || false);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: User, jwt: string) => {
    setUser(userData);
    setToken(jwt);
    setIsAdmin(userData.isAdmin || false);
    setIsAuthenticated(true);

    // Збереження у localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwt);

    // Збереження у cookie (важливо для SSR і middleware)
    document.cookie = `token=${jwt}; path=/; SameSite=Lax`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    setIsAuthenticated(false);

    // Видалення з localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Видалення з cookie
    document.cookie = 'token=; Max-Age=0; path=/;';
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
