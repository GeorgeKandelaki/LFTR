import { useQuery } from "@tanstack/react-query";
import { checkAuthentication } from "../services/checkAuthentication";

export default function useCheckAuthentication() {
    const { data, isPending, error } = useQuery({
        queryFn: checkAuthentication,
        queryKey: ["user"],
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
    });

    // useEffect(
    //     function () {
    //         if (data?.user) {
    //             setUser(data.user);
    //         }
    //     },
    //     [data?.user, setUser],
    // );

    return { isLoggedIn: data?.isLoggedIn, user: data?.user, isPending, error };
}
