export default class Set {
    constructor(weight = 0, reps = 0, previous = { weight: 0, reps: 0 }, completed = false, type = "normal") {
        this.id = Math.round(Math.random() * 1000000000000000);
        this.weight = weight;
        this.reps = reps;
        this.previous = previous;
        this.type = type;
        this.completed = completed;
    }
}
