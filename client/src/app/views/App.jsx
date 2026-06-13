import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "../../shared/components/ProtectedRoute";
import GlobalStyles from "../styles/GlobalStyles";
import Home from "../../features/Home/views/HomeDetail";
import Login from "../../features/authentication/views/Login";
import Signup from "../../features/authentication/views/Signup";
import Workouts from "../../features/Workouts/views/Workouts";
import Profile from "../../features/Profile/views/Profile";
import Settings from "../../features/Settings/views/Settings";
import Dashboard from "../../features/Dashboard/views/Dashboard";
import History from "../../features/History/views/History";
import Workout from "../../features/Workout/views/Workout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "../../shared/context/AuthContext";
import { WorkoutProvider } from "../../shared/context/WorkoutContext";
import Layout from "../../shared/components/Layout";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <GlobalStyles />
                    <Toaster position="top-center" reverseOrder={false} />
                    <AuthProvider>
                        <WorkoutProvider>
                            <Routes>
                                <Route path="*" element={<h1>404: This Route was not found!</h1>} />

                                <Route index element={<Home />} />

                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />

                                {/* // Protected Routes*/}
                                <Route element={<ProtectedRoute />}>
                                    <Route element={<Layout />}>
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/history" element={<History />} />
                                        <Route path="/workouts" element={<Workouts />} />
                                    </Route>

                                    <Route path="/currentWorkout" element={<Workout />} />
                                    <Route path="/currentWorkout/:workoutId" element={<Workout updateMode={true} />} />
                                </Route>
                            </Routes>
                        </WorkoutProvider>
                    </AuthProvider>
                </BrowserRouter>

                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default App;
