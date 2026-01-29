export class StateMachine {
    constructor(owner) {
        this.owner = owner;
        this.statesAvailable = {};
        this.currentState = null;
    }

    add(name, state) {
        this.statesAvailable[name] = state;
    }

    set(name) {
        this.currentState = this.statesAvailable[name];
        this.currentState.enter(this.owner);
    }

    update() {
        this.currentState.update(this.owner);
    }
}