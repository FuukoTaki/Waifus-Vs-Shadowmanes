import { canvas, ctx, scale } from "../app.js";
import { KeysInput } from "../utils/inputHandler.js";
import { Screen } from "./core/screen.js";
import { Player } from "../utils/player.js";
import { VCam } from "../utils/vCam.js";
import { spritesSRC } from "../utils/assetsLoader.js";

let debug = false;

export class SingleplayerScreen extends Screen {

    load() {
        console.log("SingleplayerScreen enabled!");
        this.paused = false;
        this.setFrameRate(60);
        this.startGame();
    }

    remove() {
        cancelAnimationFrame(this.gameLoopController);
    }

    startGame() {
        this.player = new Player(canvas.width / 2, canvas.height / 2, 48, 48);
        this.player.hitbox.showHitbox();

        this.vCam = new VCam(this.player, 24);

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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
            this.gameLoop();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    gameLoop = () => {
        this.logic();
        this.render();
    }

    logic() {
        this.vCam.track();
        this.playerMovement();
    }

    playerMovement() {
        const movementKeys = ["w", "s", "a", "d"];
        let count = 0;

        for (const key of movementKeys) {
            if (KeysInput.pressedKeys.has(key)) count++;
        }

        const speed = this.player.movementSpeed;
        const auxSpeed = (count >= 2) ? speed / Math.sqrt(2) : speed;
        const movementSpeed = Math.trunc(auxSpeed * 100) / 100;

        if (KeysInput.pressedKeys.has("w")) this.player.y -= movementSpeed;
        if (KeysInput.pressedKeys.has("s")) this.player.y += movementSpeed;
        if (KeysInput.pressedKeys.has("a")) this.player.x -= movementSpeed;
        if (KeysInput.pressedKeys.has("d")) this.player.x += movementSpeed;

        this.player.tick();

        if (debug) console.log(movementSpeed);
    }

    render() {
        ctx.fillRect(100, 100, 24, 24);
        ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        if (this.player.hitbox.visible) ctx.strokeRect(this.player.hitbox.x, this.player.hitbox.y, this.player.hitbox.width, this.player.hitbox.height);

        ctx.drawImage(spritesSRC["princessIDLE"], 0, 0);
    }
}