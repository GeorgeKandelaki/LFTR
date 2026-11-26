import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../../shared/utils/constants";

export async function fetchTemplates() {
    try {
        const response = await axios({ method: "get", url: `${API}/workoutTemplates/`, withCredentials: true });

        return response.data.templates;
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}
