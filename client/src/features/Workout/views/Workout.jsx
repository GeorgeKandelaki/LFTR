import { useEffect } from "react";
import { useWorkout } from "../../../shared/context/WorkoutContext";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

import Exercise from "../../../shared/models/Exercise";
import Spinner from "../../../shared/components/Spinner";
import { filterObj } from "../../../shared/utils/utils";
import Button from "../../../shared/components/Button";
import WorkoutProgress from "./WorkoutProgress";
import WorkoutExercises from "./WorkoutExercises";
import toast from "react-hot-toast";
import useFinishWorkout from "../hooks/useFinishWorkout";

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

const AddExerciseButton = styled.button`
    width: 100%;
    background-color: var(--color-neutral-700);
    border: none;
    border-top: 1px solid var(--color-border-strong);
    color: var(--color-accent-600);
    font-weight: 600;
    padding: 2.4rem 3.2rem;
    font-size: 1.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid var(--color-border-strong);
    border-radius: 2rem;
    margin-top: 4.8rem;

    transition: opacity 0.3s;

    &:hover {
        opacity: 0.5;
    }
`;

const WorkoutFinalActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;

    margin: 2.4rem 0;
`;

export default function Workout() {
    const navigate = useNavigate();
    const { workout, dispatch } = useWorkout();
    const { mutate, isPending } = useFinishWorkout();

    useEffect(
        function () {
            if (workout && workout?.workoutStarted === false) navigate("/workouts");
        },
        [navigate, workout],
    );

    function onFinish() {
        const filteredWorkout = {
            ...workout,
            finishedAt: Date.now(),
            exercises: workout.exercises.map((exercise) => ({
                ...filterObj(exercise, ["id", "exerciseCompleted"]),
                sets: exercise.sets.map((set) => ({ ...filterObj(set, ["id"]) })),
            })),
        };

        mutate(filteredWorkout, {
            onSuccess: (data) => {
                toast.success("Workout Finished!");
                dispatch({ type: "workout/finish" });
            },
            onError: (err) => {
                console.log("CALL ERROR FIRED", err);
            },
        });
    }

    if (isPending) return <Spinner />;

    return (
        <StyledWorkout>
            {/* <--- HEADER ---> */}
            <WorkoutHeader>
                <WorkoutHeading>{workout.name}</WorkoutHeading>

                <WorkoutDescription>{workout.description}</WorkoutDescription>
            </WorkoutHeader>

            {/* <--- WORKOUT PROGRESS BAR ---> */}
            <WorkoutProgress maxExercises={workout.exercises.length} finishedExercise={0} />

            {/* <--- WORKOUT EXERCISES/SETS ---> */}
            <WorkoutExercises exercises={workout.exercises} />

            {/* <--- ADD EXERCISE BUTTON ---> */}
            <AddExerciseButton
                onClick={() => {
                    dispatch({
                        type: "exercise/create",
                        payload: { exercise: new Exercise("New Exercise", [], false, Date.now()) },
                    });
                }}
            >
                + Add Exercise
            </AddExerciseButton>

            {/* <--- FINISH/REMOVE/DISCARD WORKOUT ---> */}
            <WorkoutFinalActions>
                <Button onClick={onFinish}>Finish Workout</Button>
                <Button
                    variation="delete"
                    onClick={() => {
                        toast.success("Workout Discarded!");
                        dispatch({ type: "workout/discard" });
                    }}
                >
                    Discard Workout
                </Button>
            </WorkoutFinalActions>
        </StyledWorkout>
    );
}
