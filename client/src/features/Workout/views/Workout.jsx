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
import useUpdateWorkout from "../hooks/useUpdateWorkout";
import { useRef } from "react";

const StyledWorkout = styled.main`
    padding: 0 2.4rem;
    margin: 9.6rem auto;

    max-width: 120rem;
`;

const WorkoutHeader = styled.div`
    display: inline-flex;
    flex-direction: column;
`;

const WorkoutHeading = styled.input`
    display: inline-block;
    font-size: 4rem;
    background-color: transparent;
    color: #fff;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;

    &:focus {
        outline: 2px solid var(--color-border-strong);
    }
`;

const WorkoutDescription = styled.input`
    display: inline-block;
    color: var(--color-text-secondary);
    font-weight: 500;
    background-color: transparent;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;

    &:focus {
        outline: 2px solid var(--color-border-strong);
    }
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

export default function Workout({ updateMode = false }) {
    const navigate = useNavigate();
    const { workout, dispatch } = useWorkout();
    const { mutate: finishWorkout, isPending: isFinishing } = useFinishWorkout();
    const { updateWorkout, isUpdating } = useUpdateWorkout();

    const updateWorkoutRef = useRef({
        workoutId: workout._id,
        updatedWorkoutFields: {},
        updatedExercises: [],
        updatedSets: [],
    });

    useEffect(
        function () {
            if (workout && !updateMode && workout?.workoutStarted === false) navigate("/workouts");
        },
        [navigate, workout, updateMode],
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

        finishWorkout(filteredWorkout, {
            onSuccess: () => {
                toast.success("Workout Finished!");
                dispatch({ type: "workout/finish" });
            },
            onError: (err) => {
                console.log("CALL ERROR FIRED", err);
            },
        });
    }

    function onUpdate() {}

    if (isFinishing || isUpdating) return <Spinner />;

    console.log(updateWorkoutRef.current);

    return (
        <StyledWorkout>
            <Button onClick={() => navigate(-1)} style={{ position: "absolute", top: updateMode ? "-3%" : "-6%" }}>
                &larr; Back
            </Button>
            {/* <--- HEADER ---> */}
            <WorkoutHeader>
                <WorkoutHeading
                    value={workout.name}
                    onChange={(e) => {
                        // if (e.target.value.length < 1) {
                        //     e.target.value = "New Workout";
                        //     toast.error("Workout name can't be empty!");
                        // }

                        dispatch({
                            type: "workout/update",
                            payload: {
                                name: e.target.value,
                            },
                        });

                        if (updateMode) updateWorkoutRef.current.updatedWorkoutFields.name = e.target.value;
                    }}
                />

                <WorkoutDescription
                    value={workout.description}
                    onChange={(e) => {
                        // if (e.target.value.length < 1) {
                        //     toast.error("Workout description can't be empty!");
                        //     e.target.value = "No Description";
                        // }

                        dispatch({
                            type: "workout/update",
                            payload: {
                                description: e.target.value,
                            },
                        });

                        if (updateMode) updateWorkoutRef.current.updatedWorkoutFields.description = e.target.value;
                    }}
                />
            </WorkoutHeader>

            {/* <--- WORKOUT PROGRESS BAR ---> */}
            <WorkoutProgress maxExercises={workout.exercises.length} finishedExercise={0} />

            {/* <--- WORKOUT EXERCISES/SETS ---> */}
            <WorkoutExercises
                exercises={workout.exercises}
                updateMode={updateMode}
                updateWorkoutRef={updateWorkoutRef}
            />

            {/* <--- ADD EXERCISE BUTTON ---> */}
            <AddExerciseButton
                onClick={() => {
                    dispatch({
                        type: "exercise/create",
                        payload: { exercise: new Exercise("New Exercise", []) },
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
