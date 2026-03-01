import styled from "styled-components";
import Logo from "./Logo";
import Row from "./Row";
import Button from "./Button";
import Nav from "./Nav";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.2rem;
`;

function Header() {
    return (
        <StyledHeader>
            <Logo />
            <Nav />

            <Row>
                <Button size="small">Login</Button>
                <Button size="small">Sign up</Button>
            </Row>
        </StyledHeader>
    );
}

export default Header;
