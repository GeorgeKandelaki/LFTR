import styled from "styled-components";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router";

const StyledLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

function Layout() {
    return (
        <StyledLayout>
            <Sidebar />

            <Outlet />
        </StyledLayout>
    );
}

export default Layout;
