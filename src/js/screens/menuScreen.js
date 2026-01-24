import { Screen } from "../utils/screen.js";

let debug = true;

export class MenuScreen extends Screen {

    load() {
        console.log("MenuScreen enabled!");
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