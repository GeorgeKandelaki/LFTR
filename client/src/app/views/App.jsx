import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "../styles/GlobalStyles";
import Home from "../../features/Home/views/HomeDetail";

function App() {
    return (
        <>
            <GlobalStyles />
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />

                    <Route path="/login" />
                    <Route path="/signup" />

                    {/* // Protected Routes*/}
                    <Route path="/profile" />
                    <Route path="/settings" />
                    <Route path="/dashboard" />
                    <Route path="/history" />
                    <Route path="/workout" />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
