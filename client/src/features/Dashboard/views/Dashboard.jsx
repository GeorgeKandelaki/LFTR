import styled from "styled-components";

import BestSetsStat from "./BestSetsStat";
import { useWorkouts } from "../../../shared/context/WorkoutsContext";
import useFetchBestSets from "../hooks/useFetchBestSets";
import Spinner from "../../../shared/components/Spinner";

const StyledDashboard = styled.div`
    padding: 3.2rem 4.8rem;
`;

function Dashboard() {
    // const { isPendingLastDoneExercises, workoutsData } = useWorkouts();
    const { data: bestSets, isPending: isPendingBestSets } = useFetchBestSets();

    if (isPendingBestSets) return <Spinner />;

    console.log(bestSets);
    return (
        <StyledDashboard>
            <BestSetsStat sets={bestSets} />
        </StyledDashboard>
    );
}

export default Dashboard;
