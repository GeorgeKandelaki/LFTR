import styled from "styled-components";

const StyledInput = styled.input`
    background-color: var(--color-neutral-900);
    border: none;
    padding: 1.2rem 1.4rem;
    border-radius: 5px;
    border: 2px solid var(--color-border-strong);
    width: 100%;

    color: var(--color-text-primary);
`;

function Input(props) {
    return <StyledInput {...props} />;
}

export default Input;
