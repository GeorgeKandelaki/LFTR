import styled from "styled-components";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const StyledWorkoutStats = styled.div`
    max-width: 50rem;
    width: 100%;
    max-height: 60rem;
    height: 100%;

    padding: 1.2rem 2.4rem;
    background-color: var(--color-neutral-1000);
    border: 2px solid var(--color-border-subtle);
    border-radius: 1rem;
`;

const StatHeading = styled.h2`
    border-bottom: 1px solid var(--color-border-strong);
    padding-bottom: 0.3rem;
    margin-bottom: 1.2rem;
    text-align: center;
`;

function WorkoutStats({ stats, weekly = true }) {
    return (
        <StyledWorkoutStats>
            <StatHeading>Workouts Done {weekly ? "Weekly" : "Monthly"}</StatHeading>

            <Bar
                data={{
                    labels: stats.map((stat) =>
                        new Date(stat._id).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                        }),
                    ),
                    datasets: [
                        {
                            label: `Workouts Done ${weekly ? "Weekly" : "Monthly"}`,
                            data: stats.map((stat) => stat.count),
                            backgroundColor: "#3b82f6",
                            hoverBackgroundColor: "purple",
                            borderRadius: 3,
                        },
                    ],
                }}
            />
        </StyledWorkoutStats>
    );
}

export default WorkoutStats;
