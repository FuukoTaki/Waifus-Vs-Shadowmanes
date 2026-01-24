import { canvas, ctx, scale } from "../app.js";
import { KeysInput } from "../utils/inputHandler.js";
import { Screen } from "./core/screen.js";

let debug = false;

export class SingleplayerScreen extends Screen {

    load() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        console.log("SingleplayerScreen enabled!");
        this.paused = false;
        this.setFrameRate(60);
        this.startGame();
    }

    remove() {
        cancelAnimationFrame(this.gameLoopController);
    }

    startGame() {
        if (debug) console.log("Game started!");
        requestAnimationFrame(this.gameLoopController);
    }

    setFrameRate(value) {
        this.fps = value;
        this.interval = 1000 / this.fps;
        this.deltaTime = 0;
        this.lastTime = 0;

        if (debug) console.log("Frame Rate Modified.");
        if (debug) console.log(this.fps);
    }

    gameLoopController = (time) => {

        requestAnimationFrame(this.gameLoopController);

        if (this.paused) return;

        this.deltaTime = time - this.lastTime;
        if (this.deltaTime > this.interval) {
            this.lastTime = time - (this.deltaTime % this.interval);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas.
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
            this.gameLoop(); // Call next frame.
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    gameLoop = () => {
        this.logic();
        this.render();
    }

    logic() {
        this.playerMovement();
    }

    playerMovement() {
        const movementKeys = ["w", "a", "s", "d"];
        let count = 0;

        for (const key of movementKeys) {
            if (KeysInput.pressedKeys.has(key)) count++;
        }

        if (count === 0) return;

        const speed = 2;
        const auxSpeed = (count >= 2) ? speed / Math.sqrt(2) : speed;
        const movementSpeed = Math.trunc(auxSpeed * 100) / 100;

        if (KeysInput.pressedKeys.has("w")) this.y -= movementSpeed;
        if (KeysInput.pressedKeys.has("s")) this.y += movementSpeed;
        if (KeysInput.pressedKeys.has("a")) this.x -= movementSpeed;
        if (KeysInput.pressedKeys.has("d")) this.x += movementSpeed;

        if (debug) console.log(movementSpeed);
    }

    render() {
        ctx.fillRect(this.x, this.y, 48, 48);
    }
}