import { createContext, useContext, useReducer } from "react";

const WorkoutsContext = createContext();

const initialState = {
    workouts: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "": {
            return state;
        }
    }

    throw Error("Unknown action: " + action.type);
}

function WorkoutsProvider({ children }) {
    const [workouts, dispatch] = useReducer(reducer, initialState);

    return <WorkoutsContext.Provider value={{ workouts, dispatch }}>{children}</WorkoutsContext.Provider>;
}

function useWorkouts() {
    const context = useContext(WorkoutsContext);

    if (context === null) throw new Error("WorkoutsContext was consumed outside of the WorkoutsProvider");

    return context;
}

export { WorkoutsProvider, useWorkouts };
