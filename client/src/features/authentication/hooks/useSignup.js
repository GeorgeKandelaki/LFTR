import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/authentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { useAuth } from "../../../shared/context/AuthContext";

export default function useSignup() {
    const { setUser } = useAuth();

    const navigate = useNavigate();

    const {
        error,
        data: user,
        isPending,
        mutate,
    } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            setUser(data.data.user);

            setTimeout(() => navigate("/dashboard"), 1500);
            toast.success("Account was created successfully");
        },
        onError: (err) => toast.error(err.message),
    });

    return { error, user, isPending, mutate };
}
