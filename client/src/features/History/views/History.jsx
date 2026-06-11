import styled from "styled-components";
import useFetchWorkouts from "../hooks/useFetchWorkouts";
import WorkoutCard from "./WorkoutCard";

import Spinner from "../../../shared/components/Spinner";

const StyledHistory = styled.div`
    padding: 4.8rem 3.2rem;
    width: 100%;

    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    gap: 3.2rem;
`;

const NoWorkouts = styled.p`
    font-size: 4rem;
    color: var(--color-text-secondary);
    font-weight: 600;
    text-align: center;

    margin: auto 0;
`;

function History() {
    const { data, isPending } = useFetchWorkouts();

    if (isPending) return <Spinner />;

    return (
        <StyledHistory>
            {data.workouts.length ? (
                data.workouts.map((workout) => <WorkoutCard workout={workout} key={workout._id} />)
            ) : (
                <NoWorkouts>No Workouts Found!</NoWorkouts>
            )}
        </StyledHistory>
    );
}

export default History;
