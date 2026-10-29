import axios from "axios";
import { API } from "../utils/constants";
import toast from "react-hot-toast";

export async function fetchLastDoneWorkouts() {
    try {
        const response = await axios({ method: "get", url: `${API}/workouts/getPreviousSets`, withCredentials: true });

        return response.data;
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}

export async function fetchWorkouts() {
    try {
        const response = await axios({ method: "get", url: `${API}/workouts`, withCredentials: true });

        return response.data;
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}
