import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRol } from "../models";
export interface SessionState {
    user: User,
    setUser: (user: User) => void,
    token: string,
    setToken: (token: string) => void,
    logout: () => void
}

const initialStaff: User = {
    name: "",
    ci: "",
    username: "",
    availability: false,
    rol: UserRol.UNDEFINED,
}
export const useSessionStore = create(
    persist<SessionState>(
        (set) => ({
            user: initialStaff,
            setUser: (user: User) => set(() => ({ user })),
            token: "",
            setToken: (token: string) => set(() => ({ token: token })),
            logout: () => {
                set(() => ({ token: "", user: initialStaff }));
                useSessionStore.persist.clearStorage();
            },
        }),
        {
            name: "hatunsoft-auth",
        },
    ),
);
