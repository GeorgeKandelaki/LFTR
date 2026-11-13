import { Navigate, Outlet } from "react-router";
import Spinner from "./Spinner";

import useCheckAuthentication from "../hooks/useCheckAuthentication";
import { WorkoutProvider } from "../context/WorkoutContext";
import { WorkoutsProvider } from "../context/WorkoutsContext";

function ProtectedRoute() {
    const { isLoggedIn, isPending } = useCheckAuthentication();

    if (isPending) return <Spinner />;

    if (!isLoggedIn) return <Navigate to="/login" replace />;

    return (
        <WorkoutsProvider>
            <WorkoutProvider>
                <Outlet />
            </WorkoutProvider>
        </WorkoutsProvider>
    );
}

export default ProtectedRoute;
