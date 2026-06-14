import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finishWorkout } from "../services/workout";
import toast from "react-hot-toast";

export default function useFinishWorkout() {
    const queryClient = useQueryClient();
    const {
        error,
        isPending: isFinishing,
        mutate,
    } = useMutation({
        mutationFn: finishWorkout,
        onSuccess: (data) => {
            toast.success("Workout Successfully Saved!");
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        },
        onError: (err) => {
            toast.error("Couldn't save your workout. Try again later.");
            console.error(err);
        },
    });

    return { isFinishing, mutate, error };
}
