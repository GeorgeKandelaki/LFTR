import { useQuery } from "@tanstack/react-query";
import { fetchLastDoneWorkouts } from "../services/workoutsService";
import { useEffect } from "react";

export default function useFetchLastDoneExercises(dispatch) {
    const { data, isPending, error } = useQuery({
        queryKey: ["lastDoneExercises"],
        queryFn: fetchLastDoneWorkouts,
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 3,
    });

    useEffect(
        function () {
            if (isPending) return;
            dispatch({ type: "lastDoneExercises/set", payload: data.data });
        },
        [isPending, data, dispatch],
    );

    return { data, isPending, error };
}
