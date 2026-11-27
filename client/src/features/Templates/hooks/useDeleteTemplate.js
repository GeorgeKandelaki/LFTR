import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTemplate } from "../services/templateService";
import toast from "react-hot-toast";

export default function useDeleteTemplate() {
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: () => deleteTemplate,
        onSuccess: (data) => {
            toast.success("Template Successfully Deleted!");
            queryClient.invalidateQueries({ queryKey: ["templates"] });
        },
        onError: (data) => {
            toast.error("Couldn't delete Template. try again later!");
        },
    });

    return { mutate, isPending, error };
}
