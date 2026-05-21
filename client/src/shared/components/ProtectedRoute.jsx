import { Navigate, Outlet } from "react-router";
import { toast } from "react-hot-toast";

import { useCheckAuthentication } from "../hooks/useCheckAuthentication";

function ProtectedRoute() {
    const { isLoggedIn, isPending } = useCheckAuthentication();

    if (isPending) return "Loading...";

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
