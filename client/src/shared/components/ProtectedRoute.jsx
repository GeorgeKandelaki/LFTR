import { Navigate, Outlet } from "react-router";
import Spinner from "./Spinner";

import { useCheckAuthentication } from "../hooks/useCheckAuthentication";

function ProtectedRoute() {
    const { isLoggedIn, isPending } = useCheckAuthentication();

    if (isPending) return <Spinner />;

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
