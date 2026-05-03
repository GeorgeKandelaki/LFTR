export class Exercise {
    constructor(name, sets, performedAt = Date.now()) {
        this.name = name;
        this.sets = sets;
        this.performedAt = performedAt;
        this.id = Math.round(Math.random() * 1000000000000000);
    }
}
