import { useQuery } from "@tanstack/react-query";
import { fetchWorkouts } from "../services/workoutsService";
import { useEffect } from "react";

export default function useFetchWorkouts(dispatch) {
    const { data, isPending, error } = useQuery({
        queryKey: ["workouts"],
        queryFn: fetchWorkouts,
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 3,
    });

    useEffect(
        function () {
            if (isPending) return;
            dispatch({ type: "workouts/set", payload: data?.data?.workouts });
        },
        [isPending, data, dispatch],
    );
    return { data, isPending, error };
}
