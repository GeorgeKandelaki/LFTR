import axios from "axios";
import toast from "react-hot-toast";

import { API } from "../../../shared/utils/constants";

export async function finishWorkout(workoutObj) {
    try {
        const response = await axios({
            method: "post",
            url: `${API}/workouts/uploadWorkoutObj`,
            data: workoutObj,
            withCredentials: true,
        });

        return response.data;
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || err.message);
        throw err;
    }
}
