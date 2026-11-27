import { useNavigate } from "react-router";
import Button from "../../../shared/components/Button";
import Spinner from "../../../shared/components/Spinner";
import { useWorkout } from "../../../shared/context/WorkoutContext";
import styled from "styled-components";
import useFetchTemplates from "../hooks/useFetchTemplates";
import Template from "./Template";

const StyledTemplates = styled.div`
    padding: 3.2rem 4.8rem;
    width: 100%;
`;

const NoTemplates = styled.p`
    font-size: 4rem;
    color: var(--color-text-secondary);
    font-weight: 600;
    text-align: center;

    margin: auto 0;
`;

const Heading = styled.h1`
    margin-bottom: 2.4rem;
`;

const TemplatesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 40rem);
    gap: 3.2rem;
    overflow: scroll;
`;

function Templates() {
    const navigate = useNavigate();
    const { dispatch } = useWorkout();
    const { data: templates, isPending: isPendingTemplates } = useFetchTemplates();

    function startWorkout() {
        dispatch({ type: "workout/start" });
        navigate("/currentWorkout");
    }

    if (isPendingTemplates) return <Spinner />;

    return (
        <StyledTemplates>
            <Heading>Workout Templates</Heading>

            <TemplatesContainer>
                {templates.length ? (
                    templates.map((template) => <Template key={template._id} template={template} />)
                ) : (
                    <NoTemplates>No templates found!</NoTemplates>
                )}
            </TemplatesContainer>
        </StyledTemplates>
    );
}

export default Templates;
