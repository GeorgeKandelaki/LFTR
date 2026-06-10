import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkout } from "../services/workouts";
import toast from "react-hot-toast";

export default function useDeleteWorkout() {
    const queryClient = useQueryClient();

    const { isPending, error, mutate } = useMutation({
        mutationFn: deleteWorkout,
        onSuccess: (data) => {
            toast.success("Workout Successfully Deleted!");
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        },
        onError: (err) => {
            toast.error("Couldn't delete workout. try again later!");
        },
    });

    return { isPending, error, mutate };
}
