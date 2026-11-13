export class Set {
    constructor(weight = 0, reps = 0, type = "normal", restTimer = 180, completed = false, previous = null) {
        this._id = Math.round(Math.random() * 1000000000000000);
        this.weight = weight;
        this.reps = reps;
        this.previous = previous;
        this.type = type;
        this.completed = completed;
        this.restTimer = restTimer;
    }
}
