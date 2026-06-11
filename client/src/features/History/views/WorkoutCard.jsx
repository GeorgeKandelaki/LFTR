import styled from "styled-components";

import useDeleteWorkout from "../hooks/useDeleteWorkout";

import Options from "../../../shared/components/Options";
import Spinner from "../../../shared/components/Spinner";

const StyledWorkoutCard = styled.div`
    display: inline-block;
    background-color: #111621;
    border: 1px solid var(--color-border-strong);
    border-radius: 1rem;
    padding: 2.4rem 3.2rem;

    /* height: 100%; */
`;

const WorkoutHeader = styled.div`
    position: relative;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border-strong);
    padding-bottom: 0.8rem;
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
    margin-bottom: 1.2rem;
`;

const Exercises = styled.div`
    /* display: flex; */
    /* flex-direction: column; */
    /* gap: 0.5rem; */
    & > div:not(:last-child) {
        border-bottom: 1px solid var(--color-border-subtle);
    }
`;

const Exercise = styled.div`
    padding: 0.6rem 0;
`;

const ExerciseName = styled.p`
    font-size: 1.8rem;
    font-weight: 600;
`;

const Sets = styled.div`
    display: flex;
    flex-direction: column;

    margin-left: 1.2rem;
`;
const Set = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
const SetIndex = styled.span`
    margin-right: 1rem;
    color: var(--color-text-secondary);
    font-weight: 500;
`;
const SetWeight = styled.span`
    font-weight: 600;
    font-size: 1.7rem;
`;
const SetReps = styled.span`
    font-weight: 600;
    font-size: 1.7rem;
`;

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
                            : workout.exercises.map((exercise, i) => (
                                  <Exercise key={exercise._id}>
                                      <ExerciseName>{exercise.name}</ExerciseName>
                                      <Sets>
                                          {exercise.sets.map((set, i) => (
                                              <Set key={set._id}>
                                                  <SetIndex>{i + 1}</SetIndex>
                                                  <SetWeight>{set.weight}KG</SetWeight> x <SetReps>{set.reps}</SetReps>
                                              </Set>
                                          ))}
                                      </Sets>
                                  </Exercise>
                              ))}
                    </Exercises>
                </>
            )}
        </StyledWorkoutCard>
    );
}

export default WorkoutCard;
