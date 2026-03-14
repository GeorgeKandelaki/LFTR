import styled from "styled-components";
import Logo from "./Logo";
import Row from "./Row";
import Button from "./Button";
import Nav from "./Nav";

import { useNavigate } from "react-router";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.2rem;
`;

function Header() {
    const navigate = useNavigate();

    return (
        <StyledHeader>
            <Logo />
            <Nav />

            <Row>
                <Button size="small" onClick={() => navigate("/login")}>
                    Login
                </Button>
                <Button size="small" onClick={() => navigate("/signup")}>
                    Sign up
                </Button>
            </Row>
        </StyledHeader>
    );
}

export default Header;
