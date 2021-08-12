import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts"; // Context é capaz de transmitir informações para todos os components da aplicação

export function useAuth(){
    const value = useContext(AuthContext);

    return value;
}