import { Screen } from "../utils/screen.js";

let debug = true;

export class SingleplayerScreen extends Screen {

    load() {
        console.log("SingleplayerScreen enabled!");
    }

    remove() {

    }

    handleInput({ type, key, pressedKeys }) {

        if (type === "down") {
            if (debug) console.log("KEY PRESSED!");
        }

        if (type === "up") {
            if (debug) console.log("RELEASED!");
        }
    }
}