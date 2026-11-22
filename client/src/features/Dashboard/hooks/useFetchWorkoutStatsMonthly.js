import { useQuery } from "@tanstack/react-query";
import { fetchWorkoutStatsMonthly } from "../services/dashboardService";

export default function useFetchWorkoutStatsMonthly() {
    const { data, isPending, error } = useQuery({
        queryFn: fetchWorkoutStatsMonthly,
        queryKey: ["workoutStatsMonthly"],
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 3,
    });

    return { isPending, data, error };
}
