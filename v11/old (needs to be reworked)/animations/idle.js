
import { box } from './Boxes.js';


const pushBox = box('movement', -55, -35, 105, 160);


const idle = {
    loop: true,
    // numberOfFrames: 8,
    // frameY: 0,
    // width: 1024,
    // height: 1024, 
    frameTime: 1000 / 10,

    frames: [

        // 0
        {
            spriteX: 0,
            spriteY: 0,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),    
            ]
        },

        // 1
        {
            spriteX: 512,
            spriteY: 0,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),        
            ]
        },

        // 2
        {
            spriteX: 1024,
            spriteY: 0,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),    
            ]
        },

        // 3
        {
            spriteX: 512 * 3,
            spriteY: 0,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),    
            ]
        },

        // 4
        {
            spriteX: 512 * 4,
            spriteY: 0,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),    
            ]
        },

        // 5
        {
            spriteX: 512 * 5,
            spriteY: 0,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),    
            ]
        },

        // 6
        {
            spriteX: 512 * 6,
            spriteY: 0,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),    
            ]
        },

        // 7
        {
            spriteX: 512 * 7,
            spriteY: 0,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),    
            ]
        },
    ]

};

export default idle;