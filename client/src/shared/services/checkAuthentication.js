import axios from "axios";
import { API } from "../utils/constants";

export async function checkAuthentication() {
    try {
        const response = await axios({ method: "get", url: `${API}/auth/authorized`, withCredentials: true });

        return response.data;
    } catch (err) {
        console.error(err);
    }
}
