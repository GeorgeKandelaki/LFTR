import styled from "styled-components";
import { GiBrokenHeartZone } from "react-icons/gi";

const StyledLogo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
`;
const LogoContainer = styled.div`
    background-color: var(--color-accent-500);
    padding: 6px 8px;
    border-radius: 7px;
    line-height: 1;
`;
const Name = styled.p`
    font-size: 1.8rem;
    font-weight: 700;
`;

function Logo() {
    return (
        <StyledLogo>
            <LogoContainer>
                <GiBrokenHeartZone />
            </LogoContainer>
            <Name>Pulse</Name>
        </StyledLogo>
    );
}

export default Logo;
