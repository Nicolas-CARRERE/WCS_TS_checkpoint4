import { TCredentials, TUserWithoutPassword } from "@/types/apiTypes";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserContextProps {
  user: TUserWithoutPassword;
  isAuth: boolean;
  signIn: (credentials: TCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<IUserContextProps | null>(null);

type TUserContextProviderProps = {
  children: React.ReactNode;
};

export function UserContextProvider({ children }: TUserContextProviderProps) {
  

}
