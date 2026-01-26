import { Entity } from "./entity.js";
import { Hitbox } from "./hitbox.js";
import { KeysInput } from "./inputHandler.js";

export class Player extends Entity {

    constructor(spritesheets, animationsMetadata) {
        super(spritesheets, animationsMetadata, "right");
        this.hitbox = new Hitbox(30, 36);
        this.updateHitbox();

        this.cardinalDirections = {
            FRONT: 0,
            SIDE34: 1,
            SIDE: 2,
            BACK34: 3,
            BACK: 4
        };

        this.diagonalCurrentTime = 0;
        this.diagonalTimeout = 100;

        this.movementSpeed = 4;
        this.isRolling = false;
        this.rollingSpeed = 6;
        this.rollingTicks = 30;
        this.rollingTicksCurrent = this.rollingTicks;
    }

    tick() {
        this.roll();
        this.movement();
        this.updateHitbox();
        this.hitbox.tick();
    }

    getDirection() {
        const movementKeys = ["w", "s", "a", "d"];
        let count = 0;

        for (const key of movementKeys) {
            if (KeysInput.pressedKeys.has(key)) count++;
        }

        if (count > 1) {
            this.diagonalCurrentTime = Date.now() + this.diagonalTimeout;
            this.diagonalDirection = true;
        }

        if (KeysInput.pressedKeys.has("a")) this.facingDirection = "left";
        if (KeysInput.pressedKeys.has("d")) this.facingDirection = "right";

        if (count > 1 && KeysInput.pressedKeys.has("w") && KeysInput.pressedKeys.has("a")
            || count > 1 && KeysInput.pressedKeys.has("w") && KeysInput.pressedKeys.has("d")) {
            this.framePosY = this.cardinalDirections.BACK34;
        }

        if (count >= 1 && KeysInput.pressedKeys.has("s") && KeysInput.pressedKeys.has("a")
            || count > 1 && KeysInput.pressedKeys.has("s") && KeysInput.pressedKeys.has("d")) {
            this.framePosY = this.cardinalDirections.SIDE34;
        }

        if (count === 1 && this.diagonalCurrentTime < Date.now()) {

            if (count === 1 && KeysInput.pressedKeys.has("w")) {
                this.framePosY = this.cardinalDirections.BACK;
            }

            if (count === 1 && KeysInput.pressedKeys.has("s")) {
                this.framePosY = this.cardinalDirections.FRONT;
            }

            if (count === 1 && KeysInput.pressedKeys.has("a")
                || count === 1 && KeysInput.pressedKeys.has("d")) {
                this.framePosY = this.cardinalDirections.SIDE;
            }
        }

        return count;
    }

    roll() {
        if (this.isRolling) {

            const rollingSpeed = (this.framePosY === 1 || this.framePosY === 3) ? this.rollingSpeed / Math.sqrt(2) : this.rollingSpeed;

            if (this.framePosY === 0) this.y += rollingSpeed;

            if (this.framePosY === 1) {
                this.y += rollingSpeed;
                if (this.facingDirection === "left") this.x -= rollingSpeed;
                if (this.facingDirection === "right") this.x += rollingSpeed;
            }

            if (this.framePosY === 2) {
                if (this.facingDirection === "left") this.x -= rollingSpeed;
                if (this.facingDirection === "right") this.x += rollingSpeed;
            }

            if (this.framePosY === 3) {
                this.y -= rollingSpeed;
                if (this.facingDirection === "left") this.x -= rollingSpeed;
                if (this.facingDirection === "right") this.x += rollingSpeed;
            }

            if (this.framePosY === 4) {
                this.y -= rollingSpeed;
            }

            this.rollingTicksCurrent--;
            if (this.rollingTicksCurrent <= 0) {
                this.rollingTicksCurrent = this.rollingTicks;
                this.isRolling = false;
            }
        }

        if (KeysInput.pressedKeys.has(" ") && !this.isRolling) {
            this.isRolling = true;
            this.getDirection();
            this.switchAnimation("ROLL");
        }
    }

    movement() {
        if (this.isRolling) return;

        const count = this.getDirection();

        const speed = this.movementSpeed;
        const movementSpeed = (count >= 2) ? speed / Math.sqrt(2) : speed;

        if (KeysInput.pressedKeys.has("w")) this.y -= movementSpeed;
        if (KeysInput.pressedKeys.has("s")) this.y += movementSpeed;
        if (KeysInput.pressedKeys.has("a")) this.x -= movementSpeed;
        if (KeysInput.pressedKeys.has("d")) this.x += movementSpeed;

        if (count > 0) this.switchAnimation("WALK");
        if (count === 0) this.switchAnimation("IDLE");
    }

    updateHitbox() {
        this.hitbox.x = this.x + this.width / 2 - this.hitbox.width / 2;
        this.hitbox.y = 16 + this.y + this.height / 2 - this.hitbox.height / 2;
    }

    draw(ctx) {
        super.draw(ctx);
        this.hitbox.draw(ctx);
    }


}