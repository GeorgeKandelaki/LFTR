import styled from "styled-components";
import Nav from "./Nav";

const StyledFooter = styled.footer`
    width: 100%;
    position: fixed;
    bottom: 0;
    transform: translateY(-50%);
    border-top: 2px solid var(--color-border-strong);
`;

function Footer() {
    return (
        <StyledFooter>
            <div>{/* LOGO */}</div>

            <Nav items={["Privacy", "Terms", "Twitter"]} />

            <p>&copy; {new Date().getFullYear()} Pulse Tracking. All rights reserved.</p>
        </StyledFooter>
    );
}

export default Footer;
