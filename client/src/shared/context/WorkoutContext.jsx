import { createContext, useContext, useReducer } from "react";

const initialState = {
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
            return { ...initialState, workoutStarted: true, startedAt: Date.now() };
        }

        case "workout/finish": {
            return { ...state, workoutStarted: false, finishedAt: Date.now() };
        }

        case "workout/discard": {
            return initialState;
        }

        case "workout/update": {
            return { ...state };
        }

        case "exercise/create": {
            return { ...state, exercises: [...state.exercises, action.payload.exercise] };
        }

        case "exercise/delete": {
            return {
                ...state,
                exercises: state.exercises.filter((exercise) => action.payload.exerciseId !== exercise.id),
            };
        }

        case "exercise/update": {
            return { ...state };
        }

        case "set/create": {
            return {
                ...state,
                exercises: state.exercises.map((exercise) => {
                    if (exercise.id !== action.payload.exerciseId) return exercise;

                    return {
                        ...exercise,
                        sets: [...exercise.sets, action.payload.newSet],
                    };
                }),
            };
        }

        case "set/update": {
            return {
                ...state,
                exercises: state.exercises.map((exercise) => {
                    if (exercise.id !== action.payload.exerciseId) return exercise;

                    return {
                        ...exercise,
                        sets: exercise.sets.map((set) => {
                            if (set.id !== action.payload.setId) return set;

                            return { ...set, ...action.payload.updateObj };
                        }),
                    };
                }),
            };
        }

        case "set/delete": {
            return {
                ...state,
                exercises: state.exercises.map((exercise) => {
                    if (action.payload.exerciseId !== exercise.id) return exercise;

                    return {
                        ...exercise,
                        sets: exercise.sets.filter((set) => action.payload.setId !== set.id),
                    };
                }),
            };
        }
    }

    throw Error("Unknown action: " + action.type);
}

const WorkoutContext = createContext(null);

function WorkoutProvider({ children }) {
    const [workout, dispatch] = useReducer(reducer, initialState);

    return <WorkoutContext.Provider value={{ workout, dispatch }}>{children}</WorkoutContext.Provider>;
}

function useWorkout() {
    const context = useContext(WorkoutContext);

    if (context === null) throw new Error("WorkoutContext was consumed outside of the WorkoutProvider");

    return context;
}

export { WorkoutProvider, useWorkout };
