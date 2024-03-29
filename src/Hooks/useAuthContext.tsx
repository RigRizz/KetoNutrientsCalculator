import { useContext } from "react"
import { AuthContext } from "../Context/authContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within AuthContextProvider");
    }

    return context;
}

