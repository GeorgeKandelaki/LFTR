import { useMutation } from "@tanstack/react-query";
import { finishWorkout } from "../services/workout";
import toast from "react-hot-toast";

export default function useFinishWorkout() {
    const { error, isPending, mutate } = useMutation({
        mutationFn: finishWorkout,
        onSuccess: (data) => {
            toast.success("Workout Successfully Saved!");
        },
        onError: (err) => {
            toast.error("Couldn't save your workout. Try again later.");
            console.error(err);
        },
    });

    return { isPending, mutate, error };
}
