import { canvas, ctx, scale } from "../app.js";

export class VCam {

    constructor(target, delay = 1) {
        this.target = target;
        this.delay = delay;

        this.setCentralPosition();
    }

    removeDecimals() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }

    setCentralPosition() {
        this.x = (canvas.width / 2 - this.target.x * scale - this.target.width / 2 * scale) / scale;
        this.y = (canvas.height / 2 - this.target.y * scale - this.target.height / 2 * scale) / scale;
        this.removeDecimals();
    }

    switchTarget(target) {
        this.target = target;
    }

    addRumble(intensity, duration) {
        this.rumbleIntensity = intensity;
        this.rumbleDuration = duration;
    }

    track() {
        // Get destination coordinates.
        const targetX = (canvas.width / 2 - this.target.x * scale - this.target.width / 2 * scale) / scale;
        const targetY = (canvas.height / 2 - this.target.y * scale - this.target.height / 2 * scale) / scale;

        // Move camera towards destination coordinates.
        this.x += (targetX - this.x) / this.delay;
        this.y += (targetY - this.y) / this.delay;

        // Add a rumble effect when duration is above 0.
        if (this.rumbleDuration > 0) {
            this.x += (Math.random() - 0.5) * this.rumbleIntensity;
            this.y += (Math.random() - 0.5) * this.rumbleIntensity;
            this.rumbleDuration--;
        }

        // Remove decimals and prevent any aliasing.
        this.removeDecimals();

        // Apply camera movement on the canvas.
        ctx.translate(this.x, this.y);
    }
}