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

        this.resetAnimationData();
    }

    resetAnimationData() {
        this.delayTimer = 0;
        this.framePosX = 0;
    }

    draw(ctx) {

        const spritesheet = this.spritesheets[this.currentAnimationName];

        this.delayTimer++;
        if (this.delayTimer >= this.delayBetweenFrames) {
            this.framePosX++;
            this.delayTimer = 0;

            if (this.framePosX >= this.totalFrames) {
                this.framePosX = 0;
            }
        }

        if (this.facingDirection === "right") {
            ctx.drawImage(
                spritesheet,
                this.framePosX * this.width,
                this.framePosY * this.height,
                this.width, this.height,
                this.x, this.y,
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
                -(this.x + this.width), this.y,
                this.width, this.height);
            ctx.restore();
        }
    }
}