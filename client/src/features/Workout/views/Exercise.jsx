import styled from "styled-components";

import SetClass from "../../../shared/models/Set";
import Set from "./Set";
import { useWorkout } from "../../../shared/context/WorkoutContext";
import Options from "../../../shared/components/Options";
import toast from "react-hot-toast";

const StyledExercise = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 0.5fr;
    grid-template-rows: ${({ $updateMode }) => ($updateMode ? "10rem 5rem 1fr" : "10rem 5rem 1fr 7rem")};
    border: 1px solid var(--color-border-strong);
    border-radius: 2rem;
    ${({ $updateMode }) => ($updateMode ? "overflow: hidden" : "")};
`;

const ExerciseHeader = styled.div`
    border-top-right-radius: 2rem;
    border-top-left-radius: 2rem;

    position: relative;
    background-color: var(--color-neutral-700);
    border-bottom: 1px solid var(--color-border-strong);
    padding: 3.2rem 0;

    grid-column: 1 / -1;
    grid-row: 0 / 1;

    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

const ExerciseIndex = styled.div`
    background-color: var(--color-neutral-1000);
    padding: 1.4rem 2.2rem;
    font-weight: 600;
    font-size: 1.8rem;
    border-radius: 1.6rem;
    color: var(--color-text-secondary);
`;

const ExerciseName = styled.input`
    display: inline-block;
    font-size: 3rem;
    font-weight: 600;
    background-color: transparent;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 0.6rem;

    &:focus {
        outline: 2px solid var(--color-border-strong);
    }
`;

const SetLabelTable = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 0.5fr;
    align-items: center;
    justify-items: start;

    background-color: #192336;
    grid-row: 2 / 3;
    grid-column: 1 / -1;

    padding: 1rem 2.8rem;
`;

const Sets = styled.div`
    grid-column: 1 / -1;
    grid-row: 3 / 4;

    display: flex;
    flex-direction: column;
`;

const Label = styled.p`
    font-size: 1.4rem;
    letter-spacing: 1px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-secondary);
`;

const AddSetBtn = styled.button`
    grid-column: 1 / -1;
    background-color: var(--color-neutral-700);
    border: none;
    border-top: 1px solid var(--color-border-strong);
    color: var(--color-accent-600);
    font-weight: 600;

    transition: opacity 0.3s;
    border-bottom-right-radius: 2rem;
    border-bottom-left-radius: 2rem;

    &:hover {
        opacity: 0.5;
    }
`;

function Exercise({ exercise, index, updateWorkoutRef, updateMode }) {
    const { dispatch } = useWorkout();

    function addSet() {
        dispatch({ type: "set/create", payload: { newSet: new SetClass(), exerciseId: exercise._id } });
    }

    function deleteExercise() {
        dispatch({ type: "exercise/delete", payload: { exerciseId: exercise._id } });
    }

    return (
        <StyledExercise $updateMode={updateMode}>
            <ExerciseHeader style={updateMode ? { padding: "3.2rem 2.4rem" } : {}}>
                {!updateMode && (
                    <Options
                        options={[{ label: "Delete", onClick: deleteExercise }]}
                        positionCSS={{
                            position: "absolute",
                            top: "50%",
                            right: "2rem",
                            transform: "translateY(-50%)",
                        }}
                        positionBoxCSS={{
                            position: "absolute",
                            top: "7rem",
                            right: "-6rem",
                        }}
                    />
                )}

                <ExerciseIndex>{index}</ExerciseIndex>
                <ExerciseName
                    value={exercise.name}
                    onChange={(e) => {
                        const name = e.target.value;

                        dispatch({
                            type: "exercise/update",
                            payload: { exerciseId: exercise._id, updateObj: { name } },
                        });
                        console.log(e.target.value, exercise._id);

                        if (!updateMode) return;

                        const updatedExercisesIds = updateWorkoutRef.current.updatedExercises.map(
                            (updatedExercise) => updatedExercise.exerciseId,
                        );
                        // const exists = updateWorkoutRef.current.updatedExercises.some(
                        //    (e) => e.exerciseId === exercise._id,
                        // );

                        if (!updatedExercisesIds.includes(exercise._id))
                            updateWorkoutRef.current.updatedExercises.push({
                                exerciseId: exercise._id,
                                updatedFields: { name },
                            });
                        else {
                            updateWorkoutRef.current.updatedExercises = updateWorkoutRef.current.updatedExercises.map(
                                (updatedExercise) => {
                                    if (exercise._id !== updatedExercise.exerciseId) return updatedExercise;

                                    return {
                                        ...updatedExercise,
                                        updatedFields: {
                                            ...updatedExercise.updatedFields,
                                            name,
                                        },
                                    };
                                },
                            );
                        }
                    }}
                />
            </ExerciseHeader>

            <SetLabelTable>
                <Label style={{ gridColumn: "1 / 2" }}>Set</Label>
                <Label style={{ gridColumn: "2 / 3" }}>Previous</Label>
                <Label style={{ gridColumn: "3 / 4" }}>Weight (UNIT)</Label>
                <Label style={{ gridColumn: "4 / 5" }}>REPS</Label>
                <Label
                    style={{
                        gridColumn: "5 / 6",
                        justifySelf: "center",
                    }}
                >
                    Status
                </Label>
            </SetLabelTable>

            <Sets>
                {exercise.sets.map((set, i) => (
                    <Set
                        set={set}
                        exerciseId={exercise._id}
                        index={i + 1}
                        key={set._id}
                        updateMode={updateMode}
                        updateWorkoutRef={updateWorkoutRef}
                    />
                ))}
            </Sets>

            {!updateMode && <AddSetBtn onClick={() => addSet()}>+ ADD SET</AddSetBtn>}
        </StyledExercise>
    );
}

export default Exercise;
