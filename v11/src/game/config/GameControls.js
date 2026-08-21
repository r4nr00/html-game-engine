////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GameControls.js:
// Defining specific bindings for the game / game state.
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Can separate out so each state / scene has its own bindings
export const GameControls = {
    'LEFT': [
        'Key:KeyA',
        'Key:ArrowLeft',
        'Gamepad:0:B14',
        'Gamepad:0:A0:-',
        'Gamepad:0:A2:-',
        'Gamepad:1:B14',
        'Gamepad:1:A0:-',
        'Gamepad:1:A2:-',
    ],

    'RIGHT': [
        'Key:KeyD',
        'Key:ArrowRight',
        'Gamepad:0:B15',
        'Gamepad:0:A0:+',
        'Gamepad:0:A2:+',
        'Gamepad:1:B15',
        'Gamepad:1:A0:+',
        'Gamepad:1:A2:+',
    ],

    'UP': [
        'Key:KeyW', 
        'Key:ArrowUp', 
        'Gamepad:0:B12',
        'Gamepad:0:A1:-', 
        'Gamepad:0:A3:-', 
        'Gamepad:1:B12',
        'Gamepad:1:A1:-', 
        'Gamepad:1:A3:-', 
    ],

    'DOWN': [
        'Key:KeyS', 
        'Key:ArrowDown', 
        'Gamepad:0:B13',
        'Gamepad:0:A1:+', 
        'Gamepad:0:A3:+',
        'Gamepad:1:B13',
        'Gamepad:1:A1:+', 
        'Gamepad:1:A3:+',  
    ],

    'START': [
        'Key:Space', 
        'Gamepad:0:B9', 
        'Gamepad:1:B9', 
        'Mouse:0'
    ],

    'EXIT': [
        'Key:Escape', 
        'Gamepad:0:B8', 
        'Gamepad:1:B8', 
        'Mouse:2'
    ],
};