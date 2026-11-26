import { useNavigate } from "react-router";
import Button from "../../../shared/components/Button";
import { useWorkout } from "../../../shared/context/WorkoutContext";
import styled from "styled-components";

const StyledTemplates = styled.div``;

function Templates() {
    const navigate = useNavigate();
    const { dispatch } = useWorkout();

    function startWorkout() {
        dispatch({ type: "workout/start" });
        navigate("/currentWorkout");
    }

    return (
        <StyledTemplates>
            <Button size="small" onClick={startWorkout}>
                Start a workout
            </Button>
        </StyledTemplates>
    );
}

export default Templates;
