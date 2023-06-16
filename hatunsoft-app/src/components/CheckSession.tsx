import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PublicRoutes, UserRol, adminRoutes, managerRoutes, membersRoute } from "../models";
import { useSessionStore } from "../store";

const allowedRoutes = Object.values(PublicRoutes) as string[];
export const defaultRoutes = {
	[UserRol.ADMIN]: adminRoutes.projects,
	[UserRol.MANAGER]: managerRoutes.projects,
	[UserRol.MEMBER]: membersRoute.tasks,
	[UserRol.UNDEFINED]: PublicRoutes.LOGIN,
}
export default function CheckSession() {
	const { token, user } = useSessionStore();
	const location = useLocation();

	return token === "" && user.rol === UserRol.UNDEFINED ? (
		<Outlet />
	) : allowedRoutes.includes(location.pathname) ? (
		<Navigate to={defaultRoutes[user.rol]} />
	) : (
		<Navigate to={PublicRoutes.DEFAULT} />
	);
}
