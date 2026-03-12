import styled from "styled-components";
import Nav from "./Nav";
import Logo from "./Logo";

const StyledFooter = styled.footer`
    padding: 2.8rem 3.2rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 2px solid var(--color-border-strong);

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

function Footer() {
    return (
        <StyledFooter>
            <Logo />

            <Nav items={["Privacy", "Terms", "Twitter"]} />

            <p style={{ color: "var(--color-text-secondary)", fontSize: "1.4rem", fontWeight: "500" }}>
                &copy; {new Date().getFullYear()} Pulse Tracking. All rights reserved.
            </p>
        </StyledFooter>
    );
}

export default Footer;
