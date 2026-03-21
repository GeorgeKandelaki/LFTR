import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

function useAuth() {
    const context = useContext(UserContext);

    if (context === null) throw new Error("AuthContext was consumed outside of the AuthProvider");

    return context;
}

export { useAuth, AuthProvider };
