export class StateMachine {
    constructor({ states = {}, context = {}}) {
        this.states = states;
        this.context = context;
        this.current = null;
    }

    change(stateName, params) {
        const StateClass = this.states[stateName];
        if (!StateClass) {
            console.error(`State '${stateName}' does not exist.`);
            return;
        }

        if (this.current?.exit) {
            this.current.exit();
        }

        this.current = new StateClass(this, params);

        if (this.current?.enter) {
            this.current.enter(params);
        }
    }

    update(dt) {
        this.current?.update?.(dt);
    }

    render(renderer) {
        this.current?.render?.(renderer);
    }
}
