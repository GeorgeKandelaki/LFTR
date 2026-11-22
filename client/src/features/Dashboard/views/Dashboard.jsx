import styled from "styled-components";

import BestSetsStat from "./BestSetsStat";
import useFetchBestSets from "../hooks/useFetchBestSets";
import Spinner from "../../../shared/components/Spinner";
import useFetchWorkoutStatsWeekly from "../hooks/useFetchWorkoutStatsWeekly";
import useFetchWorkoutStatsMonthly from "../hooks/useFetchWorkoutStatsMonthly";
import WorkoutStats from "./WorkoutStats";

const StyledDashboard = styled.div`
    padding: 3.2rem 4.8rem;
    width: 100%;
    overflow: scroll;

    display: flex;
    gap: 4.8rem;
    flex-wrap: wrap;
    align-items: start;
`;

function Dashboard() {
    const { data: bestSets, isPending: isPendingBestSets } = useFetchBestSets();
    const { data: workoutStatsWeekly, isPending: isPendingWorkoutStatsWeekly } = useFetchWorkoutStatsWeekly();
    const { data: workoutStatsMonthly, isPending: isPendingWorkoutStatsMonthly } = useFetchWorkoutStatsMonthly();

    if (isPendingBestSets || isPendingWorkoutStatsWeekly || isPendingWorkoutStatsMonthly) return <Spinner />;

    console.log(bestSets, workoutStatsWeekly, workoutStatsMonthly);
    return (
        <StyledDashboard>
            <BestSetsStat sets={bestSets} />
            <WorkoutStats stats={workoutStatsWeekly} />
            <WorkoutStats stats={workoutStatsMonthly} weekly={false} />
        </StyledDashboard>
    );
}

export default Dashboard;
