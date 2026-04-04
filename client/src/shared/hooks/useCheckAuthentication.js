import { useQuery } from "@tanstack/react-query";
import { checkAuthentication } from "../services/checkAuthentication";

export function useCheckAuthentication() {
    const { data: isLoggedIn, isPending, error } = useQuery({ queryFn: checkAuthentication, queryKey: ["user"] });

    return { isLoggedIn, isPending, error };
}
