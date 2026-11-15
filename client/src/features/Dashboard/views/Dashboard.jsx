import styled from "styled-components";

import { useWorkouts } from "../../../shared/context/WorkoutsContext";
import useFetchBestSets from "../hooks/useFetchBestSets";
import Spinner from "../../../shared/components/Spinner";

const StyledDashboard = styled.div``;

function Dashboard() {
    const { isPendingLastDoneExercises, workoutsData } = useWorkouts();
    const { data: bestSets, pending: isPendingBestSets } = useFetchBestSets();

    if (isPendingLastDoneExercises || isPendingBestSets) return <Spinner />;

    console.log(bestSets);
    return <StyledDashboard></StyledDashboard>;
}

export default Dashboard;
