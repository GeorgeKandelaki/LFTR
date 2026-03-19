import { createContext, useContext } from "react";

const UserContext = createContext(null);

function AuthProvider({ children }) {
    return <UserContext.Provider value={{ name: "name" }}>{children}</UserContext.Provider>;
}

function useAuth() {
    const context = useContext(UserContext);

    if (context === null) throw new Error("AuthContext was consumed outside of the AuthProvider");

    return context;
}

export { useAuth, AuthProvider };
