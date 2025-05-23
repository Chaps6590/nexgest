import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    token: string | null;    
    profile: any | null; 
    isAuth: boolean;
};

type Actions = {
    setToken: (token: string) => void;
    setProfile: (profile: any) => void;
    logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      profile: null,
      isAuth: false,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth:true
        })),

      setProfile: (profile: any) =>
        set(() => ({
          profile,
        })),        

     logout: () =>
        set(() => ({
          token: '',
          profile: null,
          isAuth: false
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
