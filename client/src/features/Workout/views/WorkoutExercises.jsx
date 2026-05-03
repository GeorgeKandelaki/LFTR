import styled from "styled-components";

import Exercise from "./Exercise";

const StyledWorkoutExercises = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function WorkoutExercises() {
    return (
        <StyledWorkoutExercises>
            <Exercise />
            <Exercise />
            <Exercise />
        </StyledWorkoutExercises>
    );
}

export default WorkoutExercises;
