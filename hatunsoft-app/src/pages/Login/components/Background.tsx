import { Box, Container, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	backgroundContainer: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		backgroundColor: theme.colors.background[6]
	},
	img: {
		height: "10rem",
	},
	header: {
		transform: "rotate(180deg)",
	},
}));

export default function Background({ children }: { children: JSX.Element | JSX.Element[] }) {
	const { classes } = useStyles();
	return (
		<Box className={classes.backgroundContainer}>
			<Container sx={{ display: "flex" }}>{children}</Container>
		</Box>
	);
}
