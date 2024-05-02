import { USER_TYPE } from "@/types";
import {
  BASE_URL,
  getFromLocalStorage,
  getFromSessionStorage,
  put,
  removeFromLocalStorage,
  removeSessionStorage,
} from "@/utils";
import { create } from "zustand";

type AuthState = {
  isUserLoading: boolean;
  user?: Partial<USER_TYPE>;
  setUser: (user: Partial<USER_TYPE>) => Promise<void>;
  logOut: (params?: string) => Promise<void>;
  getUser: (user?: string) => Promise<void>;
};
const useAuth: any = create<AuthState>((set) => ({
  isUserLoading: true,
  token: getFromSessionStorage("ACCESS_TOKEN") || null,
  user: getFromLocalStorage("user_profile") || {},
  setUser: async (user: Partial<USER_TYPE>) => {
    set({ user: { ...user } });
  },
  logOut: async () => {
    set({ user: {} });
    removeFromLocalStorage("user_profile");
    removeSessionStorage("ACCESS_TOKEN");
  },
  getUser: async () => {
    const accessToken = getFromSessionStorage("ACCESS_TOKEN");
    console.log("accessToken: ",accessToken);
    if (!accessToken) {
      set({ user: {}, isUserLoading: false });
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${accessToken}`,
        },
      });
      // const data = await res.json();

      if (res?.status === 401) {
        window?.sessionStorage?.removeItem("ACCESS_TOKEN");
        set({ user: {}, isUserLoading: false });
      }

      // if (res?.status === 200) {
      const data = await res.json();
      console.log("getUser--->", data);

      set({ user: { ...data?.user }, isUserLoading: false });
      // }
    } catch (error) {
      console.log("error: ",error);
      set({ user: {} });
    }
  },
}));

export default useAuth;
