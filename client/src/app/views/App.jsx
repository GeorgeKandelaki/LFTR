import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "../styles/GlobalStyles";
import Home from "../../features/Home/views/HomeDetail";
import Login from "../../features/authentication/views/Login";
import Signup from "../../features/authentication/views/Signup";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <GlobalStyles />
                    <Toaster position="top-center" reverseOrder={false} />
                    <Routes>
                        <Route index element={<Home />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* // Protected Routes*/}
                        <Route path="/profile" />
                        <Route path="/settings" />
                        <Route path="/dashboard" />
                        <Route path="/history" />
                        <Route path="/workout" />
                    </Routes>
                </BrowserRouter>

                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default App;
