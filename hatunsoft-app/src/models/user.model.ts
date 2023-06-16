export enum UserRol {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    MEMBER = "MEMBER",
    UNDEFINED = "UNDEFINED",
}

export interface User {
    id?: number;
    name: string;
    ci: string;
    username: string;
    availability: boolean;
    rol: UserRol
}