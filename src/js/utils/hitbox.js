export class Hitbox {

    constructor(width, height, lifespan = Infinity) {
        this.width = width;
        this.height = height;
        this.lifespan = lifespan;
        this.visible = false;
        this.enabled = true;
    }

    draw(ctx) {
        if (this.visible) ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    tick() {
        if (this.lifespan <= 0) return;

        if (this.lifespan !== Infinity) {

            this.lifespan--;

            if (this.lifespan <= 0) {
                this.lifespan = 0;
                this.enabled = false;
                console.log("Hitbox Disabled.");
            }
        }
    }

    showHitbox() {
        this.visible = true;
    }

    hideHitbox() {
        this.visible = false;
    }
}