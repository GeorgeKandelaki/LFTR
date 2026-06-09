import { useQuery } from "@tanstack/react-query";
import { fetchWorkouts } from "../services/workouts";

export default function useFetchWorkouts() {
    const {
        data: workouts,
        isPending,
        error,
    } = useQuery({
        queryKey: ["workouts"],
        queryFn: fetchWorkouts,
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 3,
    });

    return { workouts, isPending, error };
}
