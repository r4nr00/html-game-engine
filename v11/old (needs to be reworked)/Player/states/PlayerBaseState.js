// Base state

export default class PlayerBaseState {
    constructor(machine, params) {
        this.sm = machine;
        this.player = params.player;
        this.input = params.input;
    }

    enter(params) {}
    exit() {}
    update(dt) {}
    render(ctx) {}
}
