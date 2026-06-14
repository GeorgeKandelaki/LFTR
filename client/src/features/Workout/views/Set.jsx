import { useState } from "react";
import styled, { css } from "styled-components";
import { useWorkout } from "../../../shared/context/WorkoutContext";
import Options from "../../../shared/components/Options";

const StyledSet = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr 1fr 0.5fr;
    align-items: center;
    justify-items: start;

    ${({ $completed }) =>
        $completed
            ? css`
                  background-color: var(--color-success);
                  & input {
                      /* font-size: 2rem; */
                      font-weight: 500;
                      background-color: transparent;
                  }

                  & p {
                      color: var(--color-text-primary);
                  }
              `
            : css`
                  background-color: #1e293a;
              `};

    padding: 2.4rem 2.6rem;
    border-bottom: 1px solid var(--color-border-strong);
    transition: all 0.2s;
`;
/* css`background-color: ${completed ? "var(--color-success)" : "#1e293a"}}; */
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
Set;

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

function Set({ set, exerciseId, index, updateMode, updateWorkoutRef }) {
    const { dispatch } = useWorkout();

    const [weight, setWeight] = useState(set.weight);
    const [reps, setReps] = useState(set.reps);
    const [completed, setCompleted] = useState(set.completed || false);

    function updateSet(updateObj) {
        dispatch({
            type: "set/update",
            payload: {
                setId: set._id,
                exerciseId,
                updateObj,
            },
        });

        if (!updateMode) return;

        const updatedSetsIds = updateWorkoutRef.current.updatedSets.map((set) => set.setId);
        // const exists = updateWorkoutRef.current.updatedSets.some(
        //    (e) => e.setId === set._id,
        // );

        if (!updatedSetsIds.includes(set._id))
            updateWorkoutRef.current.updatedSets.push({ setId: set._id, updatedFields: { ...updateObj } });
        else {
            updateWorkoutRef.current.updatedSets = updateWorkoutRef.current.updatedSets.map((updatedSet) => {
                if (set._id !== updatedSet.setId) return updatedSet;

                return { ...updatedSet, updatedFields: { ...updatedSet.updatedFields, ...updateObj } };
            });
        }
    }

    function deleteSet() {
        dispatch({
            type: "set/delete",
            payload: {
                setId: set._id,
                exerciseId,
            },
        });
    }

    return (
        <StyledSet $completed={completed}>
            {!updateMode && (
                <Options
                    options={[{ label: "Delete", onClick: deleteSet }]}
                    positionCSS={{ position: "absolute", top: "50%", right: "2rem", transform: "translateY(-51%)" }}
                    positionBoxCSS={{
                        position: "absolute",
                        top: "7rem",
                        right: "-6rem",
                    }}
                />
            )}
            <Index>{index}</Index>
            <PreviousWeight>{set.PreviousWeight || "-- X --"}</PreviousWeight>
            <WeightInput
                type="number"
                placeholder="--"
                value={weight}
                onChange={(e) => {
                    setWeight(e.target.value);
                    updateSet({ weight: e.target.value });
                }}
            />
            <RepsInput
                type="number"
                placeholder="--"
                value={reps}
                onChange={(e) => {
                    setReps(e.target.value);
                    updateSet({ reps: e.target.value });
                }}
            />
            <CompletedStatus
                type="checkbox"
                checked={completed}
                onChange={(e) => {
                    setCompleted((completed) => !completed);
                    updateSet({ completed: e.target.checked });
                }}
            />
        </StyledSet>
    );
}

export default Set;
