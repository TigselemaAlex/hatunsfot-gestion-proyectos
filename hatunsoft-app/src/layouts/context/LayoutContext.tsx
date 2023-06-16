import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { TypeWithKey, managerRoutes, membersRoute } from "../../models";

export interface LayoutState {
	opened: boolean;
	setOpened: (opened: ((o: boolean) => boolean) | boolean) => void;
	title: string;
	setTitle: (title: ((o: string) => string) | string) => void;
}

const initialLayoutState: LayoutState = {
	opened: false,
	setOpened: () => { },
	title: "Enviar rutinas",
	setTitle: () => { },
};



export const TITLE_PATH: TypeWithKey<string> = {
	[managerRoutes.projects]: "Proyectos",
	[managerRoutes.tasks]: "Tares",
	[managerRoutes.users]: "Personal",
	[managerRoutes.hitos]: "Hitos",
	[membersRoute.tasks]: "Tareas asignadas",
};

export const LayoutContext = createContext<LayoutState>(initialLayoutState);

export const LayoutProvider = ({ children }: { children: JSX.Element }) => {
	const location = useLocation();
	const [opened, setOpened] = useState<boolean>(initialLayoutState.opened);
	const [title, setTitle] = useState<string>(TITLE_PATH[location.pathname]);

	return (
		<LayoutContext.Provider value={{ opened, setOpened, title, setTitle }}>
			{children}
		</LayoutContext.Provider>
	);
};

export const useLayout = () => {
	return useContext(LayoutContext);
};
