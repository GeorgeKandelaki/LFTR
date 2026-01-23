import { BrowserRouter, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <Routes></Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
