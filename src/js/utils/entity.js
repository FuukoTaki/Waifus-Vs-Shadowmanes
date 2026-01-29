export class Entity {

    constructor(spritesheets, animationsMetadata, facingDirection = "right") {
        this.spritesheets = spritesheets;
        this.animationsMetadata = animationsMetadata;
        this.x = 0;
        this.y = 0;
        this.currentAnimationName = "";
        this.switchAnimation("IDLE");
        this.framePosY = 0;
        this.facingDirection = facingDirection;
    }

    switchAnimation(animationName) {
        if (this.currentAnimationName === animationName) return;
        this.currentAnimationName = animationName;

        const animationMetadata = this.animationsMetadata[animationName];
        const spritesheet = this.spritesheets[animationName];
        this.width = spritesheet.width / animationMetadata.totalFramesX;
        this.height = spritesheet.height / animationMetadata.animationsNumber;
        this.delayBetweenFrames = animationMetadata.delayBetweenFrames;
        this.totalFrames = animationMetadata.totalFramesX;
        this.delayTimer = 0;
        this.framePosX = 0;
        this.animationFinished = false;
    }

    draw(ctx) {
        const spritesheet = this.spritesheets[this.currentAnimationName];
        const drawX = Math.floor(this.x);
        const drawY = Math.floor(this.y);

        this.delayTimer++;
        if (this.delayTimer >= this.delayBetweenFrames) {
            this.framePosX++;
            this.delayTimer = 0;

            if (this.framePosX >= this.totalFrames) {
                if (this.animationsMetadata[this.currentAnimationName].loop) {

                    this.framePosX = 0;
                } else {
                    this.framePosX = this.totalFrames - 1;
                    this.animationFinished = true;
                }
            }
        }

        if (this.facingDirection === "right") {
            ctx.drawImage(
                spritesheet,
                this.framePosX * this.width,
                this.framePosY * this.height,
                this.width, this.height,
                drawX, drawY,
                this.width, this.height
            );
        }

        if (this.facingDirection === "left") {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(
                spritesheet,
                this.framePosX * this.width,
                this.framePosY * this.height,
                this.width, this.height,
                -(drawX + this.width), drawY,
                this.width, this.height);
            ctx.restore();
        }
    }
}