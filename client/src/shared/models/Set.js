export class Set {
    constructor(weight = 0, reps = 0, previous = { weight: 0, reps: 0 }, completed = false, type = "normal") {
        this.weight = weight;
        this.reps = reps;
        this.previous = previous;
        this.type = type;
        this.completed = completed;
    }
}
