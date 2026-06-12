import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkout } from "../services/workout";
import toast from "react-hot-toast";

export default function useUpdateWorkout() {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: updateWorkout,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
            toast.success("Workout successfully modified.");
        },
        onError: (err) => {
            toast.error("Can't modify. Try again later.");
        },
    });

    return { mutate, isPending, error };
}
