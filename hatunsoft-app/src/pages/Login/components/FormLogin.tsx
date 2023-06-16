import {
	Box,
	Button,
	PasswordInput,
	Text,
	TextInput,
	createStyles
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { defaultRoutes } from "../../../components/CheckSession";
import { Auth, User } from "../../../models";
import { useSessionStore } from "../../../store";
import { SnackbarManager } from "../../../utils";
import { loginService } from "../services";

const useStyles = createStyles((theme) => ({
	formContainer: {
		backgroundColor: theme.colors.white[6],
		minHeight: "20	rem",
		minWidth: "23rem",
		borderRadius: "1rem",
		border: `.2rem solid ${theme.colors.blue[6]}`,
		padding: "1rem",
	},
	title: {
		textTransform: "uppercase",
		fontWeight: "bold",
		color: theme.colors.blue[6],
		marginBottom: ".5rem",
	},
	image: {
		maxWidth: "10rem",
		margin: "0 auto .2rem auto",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: ".5rem",
	},
	label: {
		color: theme.colors.blue[6],
	},
	input: {
		color: theme.colors.blue[6],
	},
	innerInput: {
		color: theme.colors.blue[6],
	},
	button: {
		marginTop: "1rem",
		textTransform: "uppercase",
	},
}));

const initialValues: Auth = {
	username: "",
	password: "",
};

const validationSchema = Yup.object<Auth>().shape({
	username: Yup.string().required(),
	password: Yup.string()
		.required()
		.min(5, "La contraseña debe ser como mínimo de 6 caracteres"),
});
const messages = {
	loginSuccess: "Ingreso exitoso"
}
export default function FormLogin() {
	const { setUser, setToken } = useSessionStore();
	const { classes } = useStyles();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const form = useForm({
		initialValues,
		validate: yupResolver(validationSchema),
	});


	const handleSubmit = async (credentials: Auth) => {
		setLoading(true);
		const res = await loginService(credentials);
		if (res.error || res.data == null) return setLoading(false);
		const user: User = {
			id: res.data.user.id,
			name: res.data.user.name,
			username: res.data.user.username,
			availability: res.data.user.availability,
			ci: res.data.user.ci,
			rol: res.data.user.authorities[0].authority
		}
		setUser(user);
		setToken(res.data.token);
		SnackbarManager.success(messages.loginSuccess)
		navigate(defaultRoutes[user.rol]);
		setLoading(false);
	};

	return (
		<Box className={classes.formContainer}>
			<Text align="center" className={classes.title}>
				Ingreso
			</Text>
			<Text align="center" fz="xl" className={classes.title}>
				Gestión de Proyectos
			</Text>
			<form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
				<TextInput
					classNames={classes}
					label="Nombre de usuario"
					placeholder="nombre"
					{...form.getInputProps("username")}
				/>
				<PasswordInput
					classNames={classes}
					label="Contraseña"
					placeholder="******"
					{...form.getInputProps("password")}
				/>
				<Button
					className={classes.button}
					color="blue"
					type="submit"
					loading={loading}
				>
					Ingresar
				</Button>
			</form>
		</Box>
	);
}
