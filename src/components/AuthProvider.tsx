import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
  createdAt: Date;
  updatedAt: Date;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  login: async () => false,
  logout: async () => false,
});

/* const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  return response.data;
} */

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          baseURL: import.meta.env.VITE_API_URL,
          withCredentials: true,
        });

        setUser(response.data as User);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password }, {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });
      const newUser = response.data as User;
      setUser(newUser);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      await axios.post("/api/auth/logout", {}, {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });

      setUser(null);
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: user !== null,
      user,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider")

  return context
}