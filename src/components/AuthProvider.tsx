import axios from "axios";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import useSWR from "swr";

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  login: async () => { },
  logout: async () => { },
});

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

  return response.data;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data, mutate } = useSWR<User>("/api/current-user", fetcher);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", { email, password }, {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });
      const newUser = response.data as User;
      setUser(newUser);
      await mutate(newUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/logout", {}, {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });

      setUser(null);
      await mutate();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: user !== null,
      user: data || user,
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