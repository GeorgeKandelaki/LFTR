import axios from "axios";
import toast from "react-hot-toast";

import { API } from "../../../shared/utils/constants";

export async function fetchWorkouts() {
    try {
        const response = await axios({ method: "get", url: `${API}/workouts`, withCredentials: true });
        console.log(response.data);

        return response.data.data;
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}
