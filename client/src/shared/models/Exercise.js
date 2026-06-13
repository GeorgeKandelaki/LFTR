import Set from "./Set";

export default class Exercise {
    constructor(name, sets, type = "normal", exerciseCompleted = false, performedAt = Date.now()) {
        this._id = Math.round(Math.random() * 1000000000000000);
        this.name = name;
        this.sets = sets;
        this.type = type;
        // this.performedAt = performedAt;
        // this.exerciseCompleted = exerciseCompleted;
    }
}
