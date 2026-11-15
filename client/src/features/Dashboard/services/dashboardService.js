import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../../shared/utils/constants";

export async function fetchBestSets() {
    try {
        const response = await axios({ url: `${API}/workouts/getBestSets`, method: "get", withCredentials: true });

        return response.data;
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}
