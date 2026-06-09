import styled from "styled-components";
import useFetchWorkouts from "../hooks/useFetchWorkouts";

import Spinner from "../../../shared/components/Spinner";

const StyledHistory = styled.div``;
function History() {
    const { workouts, isPending, error } = useFetchWorkouts();

    if (isPending) return <Spinner />;

    return <StyledHistory></StyledHistory>;
}

export default History;
