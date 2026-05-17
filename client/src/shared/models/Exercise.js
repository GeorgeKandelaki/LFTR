import Set from "./Set";

export default class Exercise {
    constructor(name, sets, exerciseCompleted = false, performedAt = Date.now()) {
        this.name = name;
        this.sets = sets;
        this.performedAt = performedAt;
        this.id = Math.round(Math.random() * 1000000000000000);
        this.exerciseCompleted = exerciseCompleted;
    }
}
