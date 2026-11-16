import styled from "styled-components";

const StyledBestSetsStat = styled.div`
    padding: 1.2rem 2.4rem;
    background-color: var(--color-neutral-1000);
    border: 2px solid var(--color-border-subtle);
    border-radius: 1rem;
`;

const Heading = styled.h2`
    border-bottom: 1px solid var(--color-border-strong);
    padding-bottom: 0.3rem;
    margin-bottom: 1.2rem;
`;

const Sets = styled.div`
    max-height: 45rem;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;
const Set = styled.div`
    border: 1px solid var(--color-border-subtle);
    border-radius: 0.9rem;
    padding: 0.6rem 1.2rem;

    & p span {
        font-weight: 700;
        font-size: 1.7rem;
    }

    & p {
        font-size: 1.7rem;
    }
`;
const ExerciseName = styled.h3`
    text-decoration: underline;
    margin-bottom: 0.4rem;
`;
const SetWeightAndReps = styled.p``;
const ExerciseDone = styled.p``;
const TotalWeight = styled.p``;

function BestSetsStat({ sets }) {
    console.log(sets);
    return (
        <StyledBestSetsStat>
            <Heading>PR's on each performed exercise</Heading>

            <Sets>
                {sets.map((set) => (
                    <Set key={set.bestSet._id}>
                        <ExerciseName>{set._id}</ExerciseName>
                        <ExerciseDone>
                            Performed:{" "}
                            <span>
                                {set.exercisesDone} {set.exercisesDone > 1 ? "times" : "time"}
                            </span>
                        </ExerciseDone>
                        <SetWeightAndReps>
                            PR:{" "}
                            <span>
                                {set.bestSet.weight} kg x {set.bestSet.reps} reps
                            </span>
                        </SetWeightAndReps>
                        <TotalWeight>
                            Total Weight Lifted: <span>{set.bestSet.reps * set.bestSet.weight} KG</span>
                        </TotalWeight>
                    </Set>
                ))}
            </Sets>
        </StyledBestSetsStat>
    );
}

export default BestSetsStat;
