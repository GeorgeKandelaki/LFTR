import styled from "styled-components";

import Exercise from "./Exercise";

const StyledWorkoutExercises = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function WorkoutExercises({ exercises, updateMode, updateWorkoutRef }) {
    return (
        <StyledWorkoutExercises>
            {exercises.map((exercise, i) => (
                <Exercise
                    exercise={exercise}
                    key={exercise._id}
                    index={i + 1}
                    updateMode={updateMode}
                    updateWorkoutRef={updateWorkoutRef}
                />
            ))}
        </StyledWorkoutExercises>
    );
}

export default WorkoutExercises;
