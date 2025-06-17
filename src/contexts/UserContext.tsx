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
  fetchUserProfileFromLocalStorage: () => void;
  fetchUserProfileFromDb: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  fetchUserProfileFromLocalStorage: () => {},
  fetchUserProfileFromDb: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfileFromLocalStorage = () => {
    if (!isLoggedIn()) return;

    console.log("Fetching user profile from local storage");
    setLoading(true);
    const localUser = getUserProfileFromLocalStorage();
    if (localUser) {
      setUser(localUser);
      setLoading(false);
      return;
    }
  };

  const fetchUserProfileFromDb = async () => {
    if (!isLoggedIn()) return;

    console.log("Fetching user profile from database");
    setLoading(true);
    try {
      const userFromApi = await getUserProfileFromDb();
      setUser(userFromApi);
      setLoading(false);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    if (!getUserProfileFromLocalStorage()) fetchUserProfileFromDb();
    else fetchUserProfileFromLocalStorage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        fetchUserProfileFromLocalStorage,
        fetchUserProfileFromDb,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
