import styled from "styled-components";

const StyledNav = styled.nav``;

const StyledUl = styled.ul`
    display: flex;
    gap: 2rem;
    align-items: center;
`;

const StyledLi = styled.li`
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5%);
    }
`;

function Nav({ items = ["Features", "Science", "Pricing"] }) {
    return (
        <StyledNav>
            <StyledUl>
                {items.map((item) => (
                    <StyledLi key={item}>{item}</StyledLi>
                ))}
            </StyledUl>
        </StyledNav>
    );
}

export default Nav;
