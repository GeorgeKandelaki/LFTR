import axios from "axios";
import toast from "react-hot-toast";

import { API } from "../../../shared/utils/constants";

export async function login({ email, password }) {
    try {
        const response = await axios({
            method: "post",
            url: `${API}/auth/login`,
            data: { email, password },
            withCredentials: true,
        });

        return response.data;
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}

export async function signup({ email, name, password }) {
    try {
        const response = await axios({
            method: "post",
            url: `${API}/auth/signup`,
            data: { email, password, name },
            withCredentials: true,
        });

        return response.data;
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}
