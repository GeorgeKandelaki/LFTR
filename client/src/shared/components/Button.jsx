import styled, { css } from "styled-components";

const variations = {
    primary: css`
        background-color: var(--primary-button-blue);
        /* box-shadow: 0 1.5rem 10px var(--color-cyan-500); */
    `,
    secondary: css`
        background-color: var(--color-neutral-800);
        border: 1px solid var(--color-border-subtle);
    `,
    tertiary: css``,
};
const sizes = {
    small: css`
        font-size: 1.4rem;
        padding: 1rem 1.4rem;
    `,
    medium: css`
        font-size: 1.6rem;
        padding: 1.6rem 3.2rem;
    `,
};

const Button = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 7px;
    font-weight: 600;
    line-height: 1;

    ${({ variation = "primary" }) => variations[variation]}
    ${({ size = "medium" }) => sizes[size]}

    transition: transform 0.5s;

    &:hover {
        transform: scale(1.05);
    }
`;

export default Button;
