import { useQuery } from "@tanstack/react-query";
import { fetchTemplates } from "../services/templateService";

export default function useFetchTemplates() {
    const { data, isPending, error } = useQuery({
        queryFn: fetchTemplates,
        queryKey: ["templates"],
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 3,
    });

    return { data, isPending, error };
}
