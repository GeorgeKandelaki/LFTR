import styled from "styled-components";

import useDeleteWorkout from "../hooks/useDeleteWorkout";

import Options from "../../../shared/components/Options";
import Spinner from "../../../shared/components/Spinner";

const StyledWorkoutCard = styled.div`
    background-color: #111621;
    border: 1px solid var(--color-border-strong);
    border-radius: 1rem;
    padding: 2.4rem 3.2rem;

    max-width: 35rem;
    max-height: 50rem;
    height: 100%;
    width: 100%;
`;

const WorkoutHeader = styled.div`
    position: relative;
    margin-bottom: 2.4rem;
    border-bottom: 1px solid var(--color-border-subtle);
    padding-bottom: 1.4rem;
`;

const WorkoutName = styled.h2``;

const WorkoutStartDate = styled.p`
    color: var(--color-text-secondary);
    font-size: 1.4rem;
`;
const WorkoutEndDate = styled.p`
    color: var(--color-text-secondary);
    font-size: 1.4rem;
`;
const WorkoutDescription = styled.p`
    color: var(--color-text-secondary);
    font-size: 1.6rem;
    margin-bottom: 1rem;
`;

const Exercises = styled.div``;

function WorkoutCard({ workout }) {
    const { mutate, isPending } = useDeleteWorkout();

    const startedAtDate = workout.startedAt;
    const finishedAtDate = workout.finishedAt;

    const parsedStartedAtDate = new Date(startedAtDate).toUTCString();
    const parsedFinishedAtDate = new Date(finishedAtDate).toUTCString();

    return (
        <StyledWorkoutCard>
            {isPending ? (
                <Spinner />
            ) : (
                <>
                    <WorkoutHeader>
                        <Options
                            options={[
                                {
                                    label: "Delete",
                                    onClick: () => mutate(workout.id),
                                },
                            ]}
                            positionCSS={{ position: "absolute", top: "0.4rem", right: "-2.4rem" }}
                            positionBoxCSS={{ position: "absolute", top: "4rem", right: "-9.6rem" }}
                        />
                        <WorkoutName>{workout.name}</WorkoutName>
                        <WorkoutDescription>{workout.description}</WorkoutDescription>

                        <WorkoutStartDate>Started: {parsedStartedAtDate}</WorkoutStartDate>
                        <WorkoutEndDate>Finished: {parsedFinishedAtDate}</WorkoutEndDate>
                    </WorkoutHeader>
                    <Exercises>
                        {!workout.exercises.length
                            ? "No Exercises"
                            : workout.exercises.map((exercise) => <div key={exercise.id}>{exercise.name}</div>)}
                    </Exercises>
                </>
            )}
        </StyledWorkoutCard>
    );
}

export default WorkoutCard;
