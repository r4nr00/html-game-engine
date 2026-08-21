// Base state

export class BaseState {
    constructor(machine) {
        this.sm = machine;
        this.context = machine.context;
    }

    enter(params) {}
    exit() {}
    update(dt) {}
    render(renderer) {}
}
