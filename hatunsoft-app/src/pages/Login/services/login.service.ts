import API from "../../../lib/API";
import { Auth, AuthResponse } from "../../../models";

const URL = "/auth/login"
export async function loginService(credetials: Auth) {
    const res = await API.post<AuthResponse>({ url: URL, data: credetials });
    console.log(res);
    
    return res
}