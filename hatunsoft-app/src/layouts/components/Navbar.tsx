import {
	Box,
	createStyles,
	Navbar as MantineNavbar,
	NavLink
} from "@mantine/core";
import {
	IconDeviceMobileMessage,
	IconUsers
} from "@tabler/icons-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { managerRoutes, membersRoute, UserRol } from "../../models";
import { useSessionStore } from "../../store";
import { useLayout } from "../context";

const useStyles = createStyles((theme) => ({
	navbar: {
		display: "flex",
		flexDirection: "column",
	},
	image: {
		maxWidth: "10rem",
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: "1rem ",
	},
	linksContainer: {
		display: "flex",
		flexDirection: "column",
	},
	link: {
		textDecoration: "none",
	},
	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.colors.white[0],
		},
	},
}));

const links = [
	{ label: "Proyectos", icon: <IconDeviceMobileMessage />, url: managerRoutes.projects },
	{ label: "Personal", icon: <IconUsers />, url: managerRoutes.users },
];
const membersLinks = [
	{ label: "Tareas asignadas", icon: <IconDeviceMobileMessage />, url: membersRoute.tasks },
];
const getLinksByRol = (rol: UserRol) => {
	if (rol == UserRol.ADMIN || rol == UserRol.MANAGER) return links
	if (rol === UserRol.MEMBER) return membersLinks;
}
export default function Navbar() {
	const { cx, classes } = useStyles();
	const { user } = useSessionStore();
	const { opened, setOpened, title, setTitle } = useLayout();
	const linksRef = useRef(getLinksByRol(user.rol));
	const handleClickLink = (title: string) => {
		setTitle(title);
		setOpened(false);
	};
	return (
		<MantineNavbar
			p="md"
			hiddenBreakpoint="sm"
			hidden={!opened}
			bg="whiteSmoke"
			width={{ sm: "9.5rem", lg: "15.5rem" }}
			className={classes.navbar}
		>
			<Box className={classes.linksContainer}>
				{linksRef.current!.map(
					(link) => (
						<Link
							to={link.url}
							key={link.label}
							className={cx(classes.link, {
								[classes.linkActive]: title === link.label,
							})}
							onClick={() => handleClickLink(link.label)}
						>
							<NavLink label={link.label} icon={link.icon} />
						</Link>
					),
				)}
			</Box>
		</MantineNavbar>
	);
}
