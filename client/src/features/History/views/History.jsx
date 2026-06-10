import styled from "styled-components";
import useFetchWorkouts from "../hooks/useFetchWorkouts";
import WorkoutCard from "./WorkoutCard";

import Spinner from "../../../shared/components/Spinner";

const StyledHistory = styled.div`
    padding: 4.8rem 3.2rem;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: top;
    gap: 3.2rem;

    flex-wrap: wrap;
`;

function History() {
    const { data, isPending } = useFetchWorkouts();

    if (isPending) return <Spinner />;

    return (
        <StyledHistory>
            {data.workouts.map((workout) => (
                <WorkoutCard workout={workout} key={workout.id} />
            ))}
        </StyledHistory>
    );
}

export default History;
