import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/authentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useSignup() {
    const navigate = useNavigate();

    const {
        error,
        data: user,
        isPending,
        mutate,
    } = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            setTimeout(() => navigate("/home"), 2000);
            toast.success("Account was created successfully");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { error, user, isPending, mutate };
}
