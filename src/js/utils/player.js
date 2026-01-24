import { Sprite } from "./sprite.js";
import { Hitbox } from "./hitbox.js";

export class Player extends Sprite {

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.hitbox = new Hitbox(x, y, width, height);

        this.movementSpeed = 2;
    }

    tick() {
        this.updateHitbox();
        this.hitbox.tick();
    }

    updateHitbox() {
        this.hitbox.x = this.x;
        this.hitbox.y = this.y;
    }
}