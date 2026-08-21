
import { box } from './Boxes.js';


const pushBox = box('movement', -55, -35, 105, 160);


const animation = {
    loop: true,
    frameTime: 1000 / 10,

    frames: [

        {
            spriteX: 0,
            spriteY: 512,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -30, 95, 90),
                box('hurt', -20, 60, 45, 62),    
            ]
        },

        {
            spriteX: 512,
            spriteY: 512,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -50, -35, 95, 90),
                box('hurt', -20, 55, 45, 67),
    
            ]
        },

        {
            spriteX: 1024,
            spriteY: 512,

            width: 512,
            height: 512,

            boxes: [
                pushBox,
                box('hurt', -25, -30, 100, 90),
                box('hurt', 5, 55, 35, 67),
                box('hit', 55, -30, 30, 90),
                box('hit', 75, -10, 30, 130),        
            ]
        },

    ]

};

export default animation;