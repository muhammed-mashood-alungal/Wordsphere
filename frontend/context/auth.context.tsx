"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types/user.types";
import AuthService from "@/services/auth.service";
import toast from "react-hot-toast";

type AuthContextType = {
  user: IUser | null;
  isAuthenticated: boolean;
  setAuth: (user: IUser | null) => void;
  setToken: (token: string) => void;
  authLoading?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setAuthLoading(true);
      const user = await AuthService.authMe();
      setUser(user);
      setIsAuthenticated(!!user);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const setAuth = (user: IUser | null) => {
    setUser(user);
    setIsAuthenticated(!!user);
  };

  const setToken = (token: string) => {
    localStorage.setItem("word_sphere_token", token);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setAuth, setToken ,authLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
