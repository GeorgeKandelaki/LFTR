import styled from "styled-components";

const variations = {};
const sizes = {};

const Button = styled.button`
    ${({ variation, size }) => `${variation},${size}`}
`;

export default Button;
