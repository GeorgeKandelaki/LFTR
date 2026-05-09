import { useState } from "react";
import styled from "styled-components";

const StyledSet = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 0.5fr;
    align-items: center;
    justify-items: start;
`;

const Index = styled.p`
    grid-column: 1 / 2;

    font-size: 2rem;
    font-weight: 600;
    color: var(--color-text-secondary);
`;

const PreviousWeight = styled.p`
    grid-column: 2 / 3;

    font-style: italic;
    color: var(--color-text-secondary);
    font-size: 1.8rem;
`;

const WeightInput = styled.input`
    width: 9.5rem;
    padding: 1rem 1.2rem;
    background-color: #0e172a;
    border: none;
    border-radius: 0.8rem;

    grid-column: 3 / 4;
`;

const RepsInput = styled.input`
    width: 9.5rem;
    padding: 1rem 1.2rem;
    border: none;
    border-radius: 0.8rem;
    background-color: #0e172a;

    grid-column: 4 / 5;
`;

const CompletedStatus = styled.input`
    grid-column: 5 / 6;
    justify-self: center;

    transform: scale(2);
`;

function Set({ set, index }) {
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [status, setStatus] = useState(false);

    return (
        <StyledSet>
            <Index>{index}</Index>
            <PreviousWeight>--</PreviousWeight>
            <WeightInput type="number" placeholder="--" />
            <RepsInput type="number" placeholder="--" />
            <CompletedStatus type="checkbox" />
        </StyledSet>
    );
}

export default Set;
