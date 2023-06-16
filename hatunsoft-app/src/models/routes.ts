export enum PublicRoutes {
    DEFAULT = "/",
    LOGIN = "/login"
}

export interface AdminRoutes {
    projects: string;
    projectWithSegment: string;
    users: string;
}

export interface MangerRoutes extends AdminRoutes {
    tasks: string;
    hitos: string
}

export interface MembersRoutes {
    tasks: string
}

export const adminRoutes: AdminRoutes = {
    projects: "/app/projects",
    projectWithSegment: "/app/project",
    users: "/app/users"
}

export const managerRoutes: MangerRoutes = {
    ...adminRoutes,
    tasks: "/app/projects/tasks",
    hitos: "/app/projects/hitos"
}

export const membersRoute: MembersRoutes = {
    tasks: "/app/tasks"
}