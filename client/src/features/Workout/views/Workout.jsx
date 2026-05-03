import { useEffect } from "react";
import { useWorkout } from "../../../shared/context/WorkoutContext";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

import WorkoutProgress from "./WorkoutProgress";
import WorkoutExercises from "./WorkoutExercises";

const StyledWorkout = styled.main`
    margin: 9.6rem 12.8rem;
    margin: 9.6rem auto;

    max-width: 120rem;
`;

const WorkoutHeader = styled.div``;

const WorkoutHeading = styled.h1`
    font-size: 4rem;
`;

const WorkoutDescription = styled.p`
    color: var(--color-text-secondary);
    font-weight: 500;
`;

const WorkoutFinalActions = styled.div``;

function Workout() {
    const navigate = useNavigate();
    const { workout } = useWorkout();

    useEffect(
        function () {
            if (workout && workout?.workoutStarted === false) navigate("/workouts");
        },
        [navigate, workout],
    );

    return (
        <StyledWorkout>
            {/* <--- HEADER ---> */}
            <WorkoutHeader>
                <WorkoutHeading>{workout.name}</WorkoutHeading>

                <WorkoutDescription>{workout.description}</WorkoutDescription>
            </WorkoutHeader>

            {/* <--- WORKOUT PROGRESS BAR ---> */}
            <WorkoutProgress />

            {/* <--- WORKOUT EXERCISES/SETS ---> */}
            <WorkoutExercises />

            {/* <--- FINISH/REMOVE/DISCARD WORKOUT ---> */}
            <WorkoutFinalActions></WorkoutFinalActions>
        </StyledWorkout>
    );
}

export default Workout;
