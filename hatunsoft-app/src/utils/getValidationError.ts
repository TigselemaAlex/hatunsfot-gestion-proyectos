import { TypeWithKey } from "../models";

export const getValidationError = (errorCode: string) => {
	const codeMatcher: TypeWithKey<string> = {
		UNAUTHORIZED: "Acceso no permitido",
		FORBIDDEN: "Acceso prohibido",
		ROUTINE_ALERT_NOT_CREATED:"Ha ocurrido un error al crear la notificación de rutina",
		INTERNAL_SERVER_ERROR: "Ha ocurrido un error en el servidor, por favor contáctese con el administrador",
		OLD_PASSWORD_INCORRECT: "Su contraseña anterior es incorrecta",
		EMAIL_ALREADY_EXIST: "Correo ya registrado",
		USER_NOT_FOUND: "Usuario no encontrado",
		Unauthorized: "Correo o contraseña incorrectos",
		ERR_NETWORK: "Error de conexión",
		PASSWORDS_NOT_CHANGED: "Error al cambiar la contraseña",
		ERR_TIMEOUT: "Se termino el tiempo de la petición",
		ERR_CANCEL: "Se canceló la petición",
		ERR_UNKNOWN: "Error desconocido",
		ERR_BAD_REQUEST: "BAD REQUEST",
		ERR_BAD_RESPONSE: "Internal server error",
		ERR_400: "Error 400",
		ERR_401: "Error 401",
		ERR_403: "Error 403",
		NOT_FOUND: "Elemento no encontrado"
	};
	return codeMatcher[errorCode];
};
