import axios, { AxiosError } from "axios";
import { createContext, useContext, useState } from "react";
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

type SessionState = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionState>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => { },
  logout: async () => { },
});


export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { data, mutate } = useSWR<User>("/api/session", async (url: string) => {
    const response = await axios.get(url, {
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    });

    return response.data;
  },
    {
      onSuccess: (data) => {
        setUser(data);
        setIsLoading(false);
      },
      onError: (error) => {
        setError(error);
        setIsLoading(false);
      },
    }
  );

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      }, {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });

      setUser(response.data);
      await mutate();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error as AxiosError);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("/api/logout", {}, {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
      });

      setUser(null);
      await mutate();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error as AxiosError);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SessionContext.Provider value={{
      user: data || user,
      isLoading,
      error,
      login,
      logout,
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext)

  if (context === undefined)
    throw new Error("useSession must be used within a SessionProvider")

  return context
}