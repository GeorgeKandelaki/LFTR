import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useWorkout } from "../../../shared/context/WorkoutContext";
import Options from "../../../shared/components/Options";
import { useEffect } from "react";

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

    padding: 1.6rem 2.6rem 1rem 2.6rem;
    /* border-bottom: 1px solid var(--color-border-strong); */
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

const Timer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    margin-top: 1.4rem;
    grid-column: 1 / -1;
    justify-self: center;

    ${({ active = false }) => ``}
`;

const TimerInactiveBars = styled.div`
    height: 3px;
    width: 100%;
    background-color: var(--color-accent-500);
    border-radius: 1rem;
`;

const TimerInput = styled.input`
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    z-index: 3;

    width: 6.4rem;
    color: transparent;
    background-color: transparent;
    border-radius: 0.5rem;
    border: none;
    text-align: center;
    /* opacity: 0; */
    appearance: none;

    &::placeholder {
        color: #cccccc;
    }
`;
const Test = styled.p`
    padding: 0.3rem 0.9rem;
    width: 6.4rem;
    color: #fff;
    border-radius: 0.5rem;
    background-color: var(--color-neutral-600);
    border: none;
    text-align: center;
`;

function Set({ set, exercise, index, updateMode, updateWorkoutRef }) {
    const { dispatch, activeRestTimer, setActiveRestTimer } = useWorkout();

    const [weight, setWeight] = useState(set.weight);
    const [reps, setReps] = useState(set.reps);
    const [completed, setCompleted] = useState(set.completed || false);
    const [rest, setRest] = useState(set.restTimer || 180);
    const constantRest = rest;

    const activeRest = activeRestTimer === set._id;

    function updateSet(updateObj) {
        dispatch({
            type: "set/update",
            payload: {
                setId: set._id,
                exerciseId: exercise.exerciseId,
                updateObj,
            },
        });

        if (!updateMode) return;

        const updatedSetsIds = updateWorkoutRef.current.updatedSets.map((set) => set.setId);
        // const exists = updateWorkoutRef.current.updatedSets.some(
        //    (e) => e.setId === set._id,
        // );

        if (!updatedSetsIds.includes(set._id))
            updateWorkoutRef.current.updatedSets.push({
                setId: set._id,
                exerciseId: set.exercise,
                updatedFields: { ...updateObj },
            });
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
                exerciseId: exercise.exerciseId,
            },
        });
    }

    useEffect(
        function () {
            if (!activeRest || !completed || rest === 0) return;

            const timeout = setTimeout(() => setRest((cur) => --cur), 1000);
            console.log("useEffect");
            return () => clearTimeout(timeout);
        },
        [activeRest, completed, rest, setRest, constantRest],
    );

    return (
        <StyledSet $completed={completed}>
            {!updateMode && (
                <Options
                    options={[
                        { label: "Delete", onClick: deleteSet },
                        { label: "Add Rest Timer", onClick: () => setRest(180) },
                        { label: "Remove Rest Timer", onClick: () => setRest(-1) },
                    ]}
                    positionCSS={{
                        position: "absolute",
                        top: set.restTimer > 0 ? "34%" : "54%",
                        right: "2rem",
                        transform: "translateY(-51%)",
                    }}
                    positionBoxCSS={{
                        position: "absolute",
                        top: "7rem",
                        right: "-6rem",
                    }}
                />
            )}
            <Index>{index}</Index>
            <PreviousWeight>
                {set.previous ? `${set.previous.weight} kg x ${set.previous.reps}` : "-- X --"}
            </PreviousWeight>
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
                    setActiveRestTimer(e.target.checked ? set._id : "");
                    updateSet({ completed: e.target.checked });
                }}
            />

            {rest > -1 && (
                <Timer>
                    <TimerInactiveBars></TimerInactiveBars>
                    <TimerInput
                        type="text"
                        value={rest}
                        onChange={(e) =>
                            setRest((cur) =>
                                Number(e.target.value) > -1 && !isNaN(Number(e.target.value))
                                    ? Number(e.target.value)
                                    : cur,
                            )
                        }
                        placeholder="SECS"
                    />

                    <Test>
                        {String(Math.floor(rest / 60)).padStart(2, "0") + ":" + String(rest % 60).padStart(2, "0")}
                    </Test>
                    <TimerInactiveBars></TimerInactiveBars>
                </Timer>
            )}
        </StyledSet>
    );
}

export default Set;
