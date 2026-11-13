import { createContext, useContext, useEffect, useReducer } from "react";
import useFetchLastDoneExercises from "../hooks/useFetchLastDoneExercises";
import useFetchWorkouts from "../hooks/useFetchWorkouts";
import Spinner from "../components/Spinner";

const WorkoutsContext = createContext();

const initialState = {
    workouts: [],
    lastDoneExercises: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "workouts/set": {
            return { ...state, workouts: action.payload };
        }

        case "lastDoneExercises/set": {
            return { ...state, lastDoneExercises: action.payload };
        }
    }

    throw Error("Unknown action: " + action.type);
}

function WorkoutsProvider({ children }) {
    const [workoutsData, dispatch] = useReducer(reducer, initialState);
    const { isPending: isPendingLastDoneExercises } = useFetchLastDoneExercises(dispatch);
    const { isPending: isPendingWorkouts } = useFetchWorkouts(dispatch);

    return (
        <WorkoutsContext.Provider value={{ workoutsData, dispatch, isPendingLastDoneExercises, isPendingWorkouts }}>
            {children}
        </WorkoutsContext.Provider>
    );
}

function useWorkouts() {
    const context = useContext(WorkoutsContext);

    if (context === null) throw new Error("WorkoutsContext was consumed outside of the WorkoutsProvider");

    return context;
}

export { WorkoutsProvider, useWorkouts };
