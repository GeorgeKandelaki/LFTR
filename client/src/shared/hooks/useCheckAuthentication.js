import { useQuery } from "@tanstack/react-query";
import { checkAuthentication } from "../services/checkAuthentication";

export function useCheckAuthentication() {
    const { data, isPending, error } = useQuery({ queryFn: checkAuthentication, queryKey: ["user"] });

    return { isLoggedIn: data?.isLoggedIn, isPending, error };
}
