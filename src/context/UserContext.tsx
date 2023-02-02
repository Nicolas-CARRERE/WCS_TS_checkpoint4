import {
  TAuthState,
  TCredentials,
  TUserWithoutPassword,
} from "@/types/apiTypes";
import axiosInstance from "@/utils/axiosinstance";
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

function UserContextProvider({ children }: TUserContextProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<TAuthState>({
    user: null,
    isAuth: false,
  });

  const signIn = async ({ email, password }: TCredentials) => {
    try {
      const { data } = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });
      setAuthState(() => ({
        isAuth: true,
        user: data,
      }));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await axiosInstance.post("/auth/signout");
      setAuthState(() => ({
        isAuth: false,
        user: null,
      }));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const checkAuth = async () => {
    //   try {
    //     const { data } = await axiosInstance.get("/auth/me");
    //     setAuthState(() => ({
    //       isAuth: true,
    //       user: data,
    //     }));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // checkAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: authState.user as TUserWithoutPassword,
        isAuth: authState.isAuth,
        signIn,
        signOut,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
