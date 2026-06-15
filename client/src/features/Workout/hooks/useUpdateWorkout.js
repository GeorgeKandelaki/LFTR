import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkout as updateWorkoutAPI } from "../services/workout";
import toast from "react-hot-toast";

export default function useUpdateWorkout() {
    const queryClient = useQueryClient();

    const {
        mutate: updateWorkout,
        isPending: isUpdating,
        error,
    } = useMutation({
        mutationFn: updateWorkoutAPI,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
            toast.success("Workout successfully modified.");
        },
        onError: (err) => {
            toast.error("Can't update. Try again later.");
        },
    });

    return { updateWorkout, isUpdating, error };
}
