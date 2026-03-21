import toast from "react-hot-toast";
import { login } from "../services/authentication";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { useAuth } from "../../../shared/context/AuthContext";

export default function useLogin() {
    const { setUser } = useAuth();

    const navigate = useNavigate();

    const {
        error,
        data: user,
        mutate,
        isPending,
    } = useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            setUser(user);

            setTimeout(() => navigate("/dashboard"), 1500);
            toast.success("Successfully Logged In");
        },
        onError: (err) => toast.error(err.message),
    });

    return { error, user, mutate, isPending };
}
