import styled from "styled-components";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router";

const StyledLayout = styled.div``;

function Layout() {
    return (
        <StyledLayout>
            <Sidebar />

            <Outlet />
        </StyledLayout>
    );
}

export default Layout;
