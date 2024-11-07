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
  login: (email: string, password: string, { onSuccess, onError }: AuthCallbacks) => void;
  logout: ({ onSuccess, onError }: AuthCallbacks) => void;
}

interface AuthCallbacks {
  onSuccess?: () => Promise<void>;
  onError?: (error: Error) => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  login: () => { },
  logout: () => { },
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
        const response = await axios.get("/api/current-user", {
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

  const login = async (email: string, password: string, callbacks: AuthCallbacks | undefined) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", { email, password }, {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });
      const newUser = response.data as User;
      setUser(newUser);
      callbacks?.onSuccess?.();
    } catch (error) {
      setUser(null);
      callbacks?.onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async (callbacks: AuthCallbacks | undefined) => {
    setIsLoading(true);
    try {
      await axios.post("/api/logout", {}, {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });

      setUser(null);
      callbacks?.onSuccess?.();
    } catch (error) {
      callbacks?.onError?.(error as Error);
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