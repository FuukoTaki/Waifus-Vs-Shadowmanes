export class Hitbox {

    constructor(x, y, width, height, lifespan = Infinity) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lifespan = lifespan;
        this.visible = false;
        this.enabled = true;
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

    updatePosition() { }

    showHitbox() {
        this.visible = true;
    }

    hideHitbox() {
        this.visible = false;
    }
}