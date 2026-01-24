import { KeysInput } from "./inputHandler.js";

let debug = false;

export class ScreensController {

    constructor(currentScreen) {

        this.currentScreen = currentScreen;
        this.currentScreen.load();

        window.addEventListener("game:keyDown", this.onKeyDown);
        window.addEventListener("game:keyUp", this.onKeyUp);
        KeysInput.enable();
    }

    onKeyDown = (e) => {
        if (debug) console.log("Key Down Received.");
        this.currentScreen.handleInput(e.detail);
    }

    onKeyUp = (e) => {
        if (debug) console.log("Key Up Received.");
        this.currentScreen.handleInput(e.detail);
    }

}