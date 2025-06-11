"use client";

import React, { createContext, useEffect, useState } from "react";
import { User } from "@/types/User";
import {
  getUserProfileFromDb,
  getUserProfileFromLocalStorage,
  isLoggedIn,
} from "@/utils/auth-utils";

type UserContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    const localUser = getUserProfileFromLocalStorage();
    if (localUser) {
      setUser(localUser);
      setLoading(false);
    } else if (isLoggedIn()) {
      try {
        const userFromApi = await getUserProfileFromDb();
        setUser(userFromApi);
        localStorage.setItem("userProfile", JSON.stringify(userFromApi));
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const handler = () => fetchUser();
    window.addEventListener("userProfileChanged", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("userProfileChanged", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
