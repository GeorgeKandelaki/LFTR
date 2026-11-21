import styled from "styled-components";
import WorkoutCard from "./WorkoutCard";

import Spinner from "../../../shared/components/Spinner";
import { useWorkouts } from "../../../shared/context/WorkoutsContext";

const StyledHistory = styled.div`
    padding: 4.8rem 3.2rem;
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fit, 40rem);
    gap: 3.2rem;
    overflow: scroll;
`;

const NoWorkouts = styled.p`
    font-size: 4rem;
    color: var(--color-text-secondary);
    font-weight: 600;
    text-align: center;

    margin: auto 0;
`;

function History() {
    const { workoutsData, isPendingLastDoneExercises, isPendingWorkouts } = useWorkouts();

    if (isPendingLastDoneExercises || isPendingWorkouts) return <Spinner />;

    return (
        <StyledHistory>
            {workoutsData.workouts.length ? (
                workoutsData.workouts.map((workout) => <WorkoutCard workout={workout} key={workout._id} />)
            ) : (
                <NoWorkouts>No Workouts Found!</NoWorkouts>
            )}
        </StyledHistory>
    );
}

export default History;
