import styled from "styled-components";

const StyledInput = styled.input`
    background-color: var(--color-neutral-900);
    border: none;
    padding: 1.2rem 1.4rem;
    border-radius: 3px;
    color: var(--color-text-muted);
`;

function Input(props) {
    return <StyledInput {...props} />;
}

export default Input;
