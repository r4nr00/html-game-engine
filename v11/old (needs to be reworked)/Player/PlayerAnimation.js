export default class PlayerAnimation {

    constructor({ image }) {
        this.image = image;
        this.current = null;
        this.frame = 0;
        this.timer = 0;
    }

    play(animation) {

        if (this.current === animation)
            return;

        this.current = animation;
        this.frame = 0;
        this.timer = 0;
    }

    update(dt) {

        if (!this.current)
            return;

        this.timer += dt;

        if (this.timer >= this.current.frameTime) {

            this.timer = 0;

            if (this.frame < this.current.frames.length - 1)
            // if (this.frame < this.current.numberOfFrames - 1)
                this.frame++;
            else if (this.current.loop)
                this.frame = 0;
        }
    }

    getFrame() {
        return this.current.frames[this.frame];
    }

    render(ctx, origin, facing) {

        const frame = this.getFrame();

        ctx.save();
        ctx.translate(origin.x, origin.y);
        ctx.scale(facing, 1);
        ctx.drawImage(
            this.image,

            frame.spriteX * 2,
            frame.spriteY * 2,
            frame.width * 2,
            frame.height * 2,

            -frame.width * 0.5,
            -frame.height * 0.5,

            frame.width,
            frame.height
        );

        this.current.frames[this.frame].boxes.forEach(box => {
            switch (box.type) {
                case 'movement':
                    ctx.strokeStyle = 'black';
                    break;
                case 'hurt':
                    ctx.strokeStyle = 'red';
                    break;
                case 'hit':
                    ctx.strokeStyle = 'blue';
                    break;
                default:
                    break;
            }
            ctx.strokeRect(
                box.offset.x,
                box.offset.y,
                box.width,
                box.height
            );
        });
        

        // ctx.drawImage(
        //     this.image,

        //     this.frame * 1024,
        //     this.current.frameY,
        //     this.current.width,
        //     this.current.height,

        //     -this.current.width * 0.5 * 0.5,
        //     -this.current.height * 0.5 * 0.5,

        //     frame.width * 0.5,
        //     frame.height * 0.5
        // );
        
        ctx.restore();
    }

}