import {
	ActionIcon,
	Box,
	Burger,
	Header as MantineHeader,
	Menu,
	Text,
	createStyles
} from "@mantine/core";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { useSessionStore } from "../../store";
import { useLayout } from "../context";

const useStyles = createStyles((theme) => ({
	icon: {
		maxWidth: 60,
		[theme.fn.smallerThan("md")]: {
			maxWidth: 40,
		},
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
		":hover": {
			cursor: "pointer"
		}
	},
	burgerIcon: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},
	title: {
		color: theme.colors.white[0],
		fontSize: "1.5rem",
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},
	userConfigContainer: {
		display: "flex",
		alignItems: "center",
	},
	userName: {
		color: theme.colors.white[0],
		fontSize: "1.2rem",
	},
	headerContent: {
		display: "flex",
		alignItems: "center",
		height: "100%",
		justifyContent: "space-between",
	},
}));

export default function Header() {
	const { classes } = useStyles();
	const { user, logout } = useSessionStore();
	const adminName =user.username;
	const navigate = useNavigate();
	const { opened, setOpened, title } = useLayout();

	const handleClickBurger = () => setOpened((o: boolean) => !o);

	// const handleClickIcon = () => {
	// 	setTitle(TITLE_PATH[AppRoutes.SEND_ROUTINES]);
	// 	navigate(AppRoutes.SEND_ROUTINES);
	// }

	const handleLogout = () => {
		navigate(PublicRoutes.LOGIN);
		logout();
	};

	return (
		<MantineHeader height={{ base: 50, md: 70 }} p="md" bg="blue">
			<Box className={classes.headerContent}>
				<Burger
					className={classes.burgerIcon}
					color="white"
					opened={opened}
					onClick={handleClickBurger}
					size="sm"
					mr="xl"
				/>
				{/* <Image src={IconErgopro} className={classes.icon} onClick={handleClickIcon} /> */}
				<Text className={classes.title}>{title}</Text>
				<Box className={classes.userConfigContainer}>
					<Text className={classes.userName}>{adminName}</Text>
					<Menu position="bottom-end">
						<Menu.Target>
							<ActionIcon variant="transparent" color="white">
								<IconChevronDown size="1.4rem" />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item icon={<IconLogout />} onClick={handleLogout}>
								Cerrar Sesión
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Box>
			</Box>
		</MantineHeader>
	);
}
