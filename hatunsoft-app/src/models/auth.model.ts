import { UserRol } from ".";

export interface Auth {
    username: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id?: number;
        name: string;
        ci: string;
        username: string;
        availability: boolean;
        authorities: { authority: UserRol }[]
    },
    token: string
}