import { useEffect } from "react";
import { Background, FormLogin } from ".";

export default function Login() {
    useEffect(() => {
        document.title = "Login";
    }, []);
    
    return (
        <Background>
            <FormLogin />
        </Background>
    )
}