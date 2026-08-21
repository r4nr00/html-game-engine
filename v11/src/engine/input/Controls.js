////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controls.js:
// Enables game to translate input for all devices into game actions.
// Bindings are separated. Each game and/or game state can have its own control bindings
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values


export class Controls {
    constructor(input, bindings) {
        this.input = input;

        // Resolution modes for SOCD / Opposing inputs
        this.AxisMode = Object.freeze({
            CANCEL: 'cancel',     // Left + Right = 0 (Default in many retro games)
            LAST_INPUT: 'last',   // Newest key overrides older key (Modern platformers/fighting games)
            FIRST_INPUT: 'first'  // Oldest key maintains priority until released
        });

        this.bindings = bindings;
    }
    
    isDown(action) {
        const keys = this.bindings[action];
        return keys ? keys.some(id => this.input.isDown(id)) : false;
    }

    wasPressed(action) {
        const keys = this.bindings[action];
        return keys ? keys.some(id => this.input.wasPressed(id)) : false;
    }

    wasReleased(action) {
        const keys = this.bindings[action];
        return keys ? keys.some(id => this.input.wasReleased(id)) : false;
    }

    // Easy remapping helper
    rebind(action, newKeys) {
        this.bindings[action] = Array.isArray(newKeys) ? newKeys : [newKeys];
    }

    // Calculates a 1D axis value between -1 and +1 for opposing actions.
    getAxis(negativeAction, positiveAction, mode = this.AxisMode.LAST_INPUT) {
        const negKeys = this.bindings[negativeAction] || [];
        const posKeys = this.bindings[positiveAction] || [];

        // Check if ANY bound key is currently down for each action
        const negActive = negKeys.some(id => this.input.isDown(id));
        const posActive = posKeys.some(id => this.input.isDown(id));

        // 1. Only one direction is pressed
        if (negActive && !posActive) return -1;
        if (posActive && !negActive) return 1;
        if (!negActive && !posActive) return 0;

        // 2. Both directions are pressed simultaneously -> Resolve Conflict
        if (mode === this.AxisMode.CANCEL) {
            return 0;
        }

        if (mode === this.AxisMode.LAST_INPUT || mode === this.AxisMode.FIRST_INPUT) {
            // Leverage JS Set insertion order from Input.current
            let negIndex = -1;
            let posIndex = -1;

            let index = 0;
            for (const inputId of this.input.current) {
                if (negKeys.includes(inputId)) negIndex = index;
                if (posKeys.includes(inputId)) posIndex = index;
                index++;
            }

            if (mode === this.AxisMode.LAST_INPUT) {
                return posIndex > negIndex ? 1 : -1;
            } else { // FIRST_INPUT
                return posIndex < negIndex ? 1 : -1;
            }
        }

        return 0;
    }
}