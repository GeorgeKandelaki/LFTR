import styled from "styled-components";
import Button from "./Button";

const Heading = styled.h3``;

const StyledConfirmAction = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-neutral-1000);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

function ConfirmAction({
    action,
    onConfirm,
    disabled,
    onCloseModal,
    description = "Are you sure you want to perform this action? This action cannot be undone.",
}) {
    return (
        <StyledConfirmAction>
            <Heading>{action}</Heading>
            <p>{description}</p>

            <div>
                <Button variation="secondary" onClick={onCloseModal} disabled={disabled}>
                    Cancel
                </Button>
                <Button variation="primary" onClick={onConfirm} disabled={disabled}>
                    Confirm
                </Button>
            </div>
        </StyledConfirmAction>
    );
}

export default ConfirmAction;
