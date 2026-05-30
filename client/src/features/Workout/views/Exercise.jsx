import styled from "styled-components";

import SetClass from "../../../shared/models/Set";
import Set from "./Set";
import { useWorkout } from "../../../shared/context/WorkoutContext";
import Options from "../../../shared/components/Options";

const StyledExercise = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 0.5fr;
    grid-template-rows: 10rem 5rem 1fr 7rem;
    border: 1px solid var(--color-border-strong);
    border-radius: 2rem;
    overflow: hidden;
`;

const ExerciseHeader = styled.div`
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

const ExerciseName = styled.h2``;

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
    /* border-top: 1px solid var(--color-border-strong); */
    color: var(--color-accent-600);
    font-weight: 600;

    transition: opacity 0.3s;

    &:hover {
        opacity: 0.5;
    }
`;

function Exercise({ exercise, index }) {
    const { dispatch } = useWorkout();

    function addSet() {
        dispatch({ type: "set/create", payload: { newSet: new SetClass(), exerciseId: exercise.id } });
    }

    function deleteExercise() {
        dispatch({ type: "exercise/delete", payload: { exerciseId: exercise.id } });
    }

    return (
        <StyledExercise>
            <ExerciseHeader>
                <Options
                    options={[{ label: "Delete", onClick: deleteExercise }]}
                    positionCSS={{
                        position: "absolute",
                        top: "50%",
                        right: "2rem",
                        transform: "translateY(-50%)",
                    }}
                />

                <ExerciseIndex>{index}</ExerciseIndex>
                <ExerciseName>{exercise.name}</ExerciseName>
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
                    <Set set={set} exerciseId={exercise.id} index={i + 1} key={set.id} />
                ))}
            </Sets>

            <AddSetBtn onClick={() => addSet()}>+ ADD SET</AddSetBtn>
        </StyledExercise>
    );
}

export default Exercise;
