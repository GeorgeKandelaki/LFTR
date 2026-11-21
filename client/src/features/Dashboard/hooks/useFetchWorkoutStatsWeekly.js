import { useQuery } from "@tanstack/react-query";
import { fetchWorkoutStatsWeekly } from "../services/dashboardService";

export default function useFetchWorkoutStatsWeekly() {
    const { data, isPending, error } = useQuery({
        queryFn: fetchWorkoutStatsWeekly,
        queryKey: ["workoutStatsWeekly"],
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 3,
    });

    return { data, isPending, error };
}
