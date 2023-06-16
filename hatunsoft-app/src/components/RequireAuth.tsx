import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserRol, adminRoutes, managerRoutes, membersRoute } from "../models";
import { useSessionStore } from "../store";

const allowedRoutes = {
	[UserRol.ADMIN]: Object.values(adminRoutes),
	[UserRol.MANAGER]: Object.values(managerRoutes),
	[UserRol.MEMBER]: Object.values(membersRoute),
};

export default function RequireAuth() {
	const { token, user } = useSessionStore();

	const location = useLocation();
	const navigate = useNavigate();

	const { } = useParams()
	useEffect(() => {
		if (!token) return navigate("/");
	}, [token]);
	if (location.pathname.includes(managerRoutes.projectWithSegment)) return <Outlet />
	return user.rol !== UserRol.UNDEFINED && allowedRoutes[user.rol].includes(location.pathname) ?
		<Outlet />
		: (
			<Navigate replace to="/" />
		);
}
