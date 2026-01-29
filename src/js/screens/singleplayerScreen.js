import { canvas, ctx, scale } from "../app.js";
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
        const playerAnimations = {
            IDLE: spritesSRC["princessIDLE"],
            WALK: spritesSRC["princessWALK"],
            ROLL: spritesSRC["princessROLL"]
        };

        const playerAnimationsMetadata = {
            IDLE: {
                name: "IDLE",
                totalFramesX: 6,
                animationsNumber: 5,
                delayBetweenFrames: 6,
                loop: true
            },
            WALK: {
                name: "WALK",
                totalFramesX: 6,
                animationsNumber: 5,
                delayBetweenFrames: 4,
                loop: true
            },
            ROLL: {
                name: "ROLL",
                totalFramesX: 11,
                animationsNumber: 5,
                delayBetweenFrames: 3,
                loop: false
            }
        };

        this.player = new Player(playerAnimations, playerAnimationsMetadata);
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
        this.player.tick();
    }

    render() {
        ctx.fillRect(100, 100, 24, 24);
        this.player.draw(ctx);
    }
}