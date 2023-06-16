import { AppShell, Container, createStyles } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header, Navbar } from "./components";
import { LayoutProvider } from "./context";

const useStyles = createStyles(() => ({
	container: {
		maxWidth: "100%",
		height: "80vh",
		minHeight: "100%",
		padding: "1rem",
	},
}));

export default function AppLayout() {
	const { classes } = useStyles();
	return (
		<LayoutProvider>
			<AppShell
				padding={0}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				navbar={<Navbar />}
				header={<Header />}
			>
				<Container className={classes.container} bg="background">
					<Outlet />
				</Container>
			</AppShell>
		</LayoutProvider>
	);
}
