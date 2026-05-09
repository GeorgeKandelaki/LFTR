import { createContext, useContext, useReducer } from "react";

const initial = {
    name: "New Workout",
    description: "No Description",
    startedAt: "",
    finishedAt: "",
    exercises: [],
    workoutStarted: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "workout/start": {
            return { ...state, workoutStarted: true, startedAt: Date.now() };
        }

        case "workout/finish": {
            return { ...state, workoutStarted: false, finishedAt: Date.now() };
        }

        case "workout/set_name": {
            return { ...state, name: action.payload.name };
        }
        case "workout/set_description": {
            return { ...state, description: action.payload.description };
        }

        case "exercise/create": {
            return { ...state, exercises: [...state.exercises, action.payload.exercise] };
        }

        case "exercise/delete": {
            return { ...state };
        }

        case "exercise/update": {
            return { ...state };
        }

        case "set/create": {
            return { ...state };
        }

        case "set/update": {
            return { ...state };
        }

        case "set/delete": {
            return { ...state };
        }
    }
    throw Error("Unknown action: " + action.type);
}

const WorkoutContext = createContext(null);

function WorkoutProvider({ children }) {
    const [workout, dispatch] = useReducer(reducer, initial);

    return <WorkoutContext.Provider value={{ workout, dispatch }}>{children}</WorkoutContext.Provider>;
}

function useWorkout() {
    const context = useContext(WorkoutContext);

    if (context === null) throw new Error("WorkoutContext was consumed outside of the WorkoutProvider");

    return context;
}

export { WorkoutProvider, useWorkout };
