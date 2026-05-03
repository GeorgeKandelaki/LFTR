import { useNavigate } from "react-router";
import Button from "../../../shared/components/Button";
import { useWorkout } from "../../../shared/context/WorkoutContext";

function Workouts() {
    const navigate = useNavigate();
    const { dispatch } = useWorkout();

    function startWorkout() {
        dispatch({ type: "workout/start" });
        navigate("/currentWorkout");
    }

    return (
        <div>
            <Button size="small" onClick={startWorkout}>
                Start a workout
            </Button>
        </div>
    );
}

export default Workouts;
