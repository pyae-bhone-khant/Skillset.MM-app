"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface UserProfile {
  fullName: string;
  bio?: string;
  avatarUrl?: string;
  category?: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  profile?: UserProfile; // ဒီမှာ profile ပါဝင်ကြောင်း သတ်မှတ်ပေးပါ
}
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
    const storedUser = localStorage.getItem("user");
  console.log("LocalStorage Data:", storedUser); // ဒီမှာ ဘာတွေပါလဲ သေချာကြည့်ပါ
  
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    // အကယ်၍ API က ပို့လိုက်တဲ့ data က user object ဖြစ်နေရင်
    // සමහරအခါ data.user သို့မဟုတ် user ပဲဖြစ်နိုင်ပါတယ်
    setUser(parsedUser); 
  }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
