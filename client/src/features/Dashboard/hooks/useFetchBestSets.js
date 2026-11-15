import { useQuery } from "@tanstack/react-query";
import { fetchBestSets } from "../services/dashboardService";

export default function useFetchBestSets() {
    const { data, pending, error } = useQuery({
        queryFn: fetchBestSets,
        queryKey: ["bestSets"],
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 3,
    });

    return { data, pending, error };
}
