import { createContext, useContext, useReducer } from "react";

const workout = {
    name: "",
    description: "",
    startedAt: "",
    finishedAt: "",
    exercises: [],
    workoutStarted: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "workout/start": {
            return { ...state, workoutStarted: true, startedAt: Date.now };
        }

        case "workout/finish": {
            return { ...state, workoutStarted: false, finishedAt: Date.now };
        }

        case "workout/set_name": {
            return { ...state, name: action.payload.name };
        }
        case "workout/set_description": {
            return { ...state, description: action.payload.description };
        }

        case "workout/set_startedAt": {
            return { ...state, startedAt: action.payload.startedAt };
        }

        case "workout/set_finishedAt": {
            return { ...state, finishedAt: action.payload.finishedAt };
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
    const [state, dispatch] = useReducer(reducer, workout);

    return <WorkoutContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutContext.Provider>;
}

function useWorkout() {
    const context = useContext(WorkoutContext);

    if (context === null) throw new Error("WorkoutContext was consumed outside of the WorkoutProvider");

    return context;
}

export { WorkoutProvider, useWorkout };
