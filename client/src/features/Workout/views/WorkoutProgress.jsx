import styled from "styled-components";

const StyledWorkoutProgress = styled.div`
    background-color: var(--color-neutral-700);
    padding: 2.4rem 2rem;
    border-radius: 1.4rem;
    border: 1px solid var(--color-border-strong);
    margin: 3.4rem 0 3rem 0;
`;

const ExerciseIndicator = styled.p`
    color: var(--color-text-secondary);
    font-weight: 500;
`;

const PercentageIndicator = styled.p`
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--color-accent-600);
`;

const Bar = styled.div`
    position: relative;
    width: 100%;
    height: 1.8rem;
    background-color: var(--color-neutral-900);
    border-radius: 10rem;
`;

const BarCompleted = styled.div`
    position: absolute;
    height: 1.8rem;
    background-color: var(--color-accent-600);
    border-radius: 10rem;
    width: ${({ width = 0 }) => `${width}%`};
`;

function WorkoutProgress({ maxExercises = 0, finishedExercise = 0 }) {
    const percentage = Math.round((finishedExercise / maxExercises) * 100) || 0;

    return (
        <StyledWorkoutProgress>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: "1.4rem",
                }}
            >
                <div>
                    <p style={{ fontWeight: "600", fontSize: "1.8rem" }}>Workout Progress</p>
                    <ExerciseIndicator>
                        {finishedExercise} of {maxExercises} exercises completed!
                    </ExerciseIndicator>
                </div>

                <PercentageIndicator>{percentage}%</PercentageIndicator>
            </div>
            <Bar>
                <BarCompleted width={percentage}></BarCompleted>
            </Bar>
        </StyledWorkoutProgress>
    );
}

export default WorkoutProgress;
