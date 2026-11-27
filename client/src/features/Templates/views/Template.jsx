import styled from "styled-components";
import Button from "../../../shared/components/Button";
import Options from "../../../shared/components/Options";
import { useNavigate } from "react-router";
import useDeleteTemplate from "../hooks/useDeleteTemplate";
import Spinner from "../../../shared/components/Spinner";

const StyledTemplate = styled.div`
    align-self: start;

    display: flex;
    flex-direction: column;
    padding: 2.4rem 3.2rem;
    background-color: var(--color-neutral-1000);
    border: 1px solid var(--color-border-strong);
    border-radius: 1rem;

    max-height: 50rem;
    height: 100%;
    max-width: 40rem;
    width: 100%;
`;

const TemplateHeader = styled.div`
    position: relative;
    margin-bottom: 1rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--color-border-subtle);
`;

const Name = styled.h2``;

const Description = styled.p`
    color: var(--color-text-secondary);
    font-size: 1.6rem;
`;

const Exercises = styled.div`
    max-height: 35rem;
    height: 100%;

    height: 100%;
    & > div:not(:last-child) {
        border-bottom: 1px solid var(--color-border-subtle);
    }

    overflow-y: scroll;
    margin-bottom: 1.6rem;
`;

const Exercise = styled.div`
    padding: 0.6rem 0;
`;

const ExerciseName = styled.p`
    font-size: 1.8rem;
    font-weight: 600;
`;

const ExerciseSets = styled.div`
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

function Template({ template }) {
    const navigate = useNavigate();
    const { mutate, isPending: isPendingDelete } = useDeleteTemplate();

    console.log(template);
    return (
        <StyledTemplate>
            {isPendingDelete ? (
                <Spinner />
            ) : (
                <>
                    <TemplateHeader>
                        <Options
                            options={[
                                {
                                    label: "Delete",
                                    onClick: () => mutate(template._id),
                                },
                                {
                                    label: "Update",
                                    onClick: () => {
                                        navigate("/currentWorkout/" + template._id);
                                    },
                                },
                            ]}
                            positionCSS={{ position: "absolute", top: "0.4rem", right: "-2.4rem" }}
                            positionBoxCSS={{ position: "absolute", top: "4rem", right: "-9.6rem" }}
                        />

                        <Name>{template.name}</Name>
                        <Description>{template.description}</Description>
                    </TemplateHeader>

                    <Exercises>
                        {template.exercises.map((exercise, i) => (
                            <Exercise key={i}>
                                <ExerciseName>{exercise.name}</ExerciseName>
                                <ExerciseSets>
                                    {exercise.sets.map((set, i) => (
                                        <Set key={i}>
                                            <SetIndex>{i + 1}</SetIndex>
                                            <SetWeight>{set.weight}</SetWeight> KG x<SetReps>{set.reps}</SetReps>
                                        </Set>
                                    ))}
                                </ExerciseSets>
                            </Exercise>
                        ))}
                    </Exercises>

                    <Button>Start Workout</Button>
                </>
            )}
        </StyledTemplate>
    );
}

export default Template;
