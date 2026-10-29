import axios from "axios";
import toast from "react-hot-toast";

import { API } from "../../../shared/utils/constants";

export async function deleteWorkout(workoutId) {
    try {
        const response = await axios({ method: "delete", url: `${API}/workouts/${workoutId}`, withCredentials: true });
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}
