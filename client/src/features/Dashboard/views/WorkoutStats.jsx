import styled from "styled-components";
import Chart from "chart.js/auto";
import { CategoryScale, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const StyledWorkoutStats = styled.div`
    max-width: 85rem;
    width: 100%;
    max-height: 60rem;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 1.6rem 2.4rem;
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
            {weekly && (
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
                                label: `Workouts Done Weekly`,
                                data: stats.map((stat) => stat.count),
                                backgroundColor: "#3b82f6",
                                hoverBackgroundColor: "purple",
                                borderRadius: 3,
                            },
                        ],
                    }}
                    plugins={[{}]}
                />
            )}

            {!weekly && (
                <Bar
                    data={{
                        labels: stats.map((stat) =>
                            new Date(stat._id).toLocaleDateString("en-US", {
                                month: "2-digit",
                                year: "numeric",
                            }),
                        ),

                        datasets: [
                            {
                                label: "Workouts Done Monthly",
                                data: stats.map((stat) => stat.count),
                                backgroundColor: "purple",
                                hoverBackgroundColor: "#3b82f6",
                                borderRadius: 3,
                            },
                        ],
                    }}
                    plugins={[{}]}
                />
            )}
        </StyledWorkoutStats>
    );
}

export default WorkoutStats;
