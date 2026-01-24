let debug = false;

/**
 * -- KEYS INPUT --
 * 
 * This class detects any key being pressed, and dispatchs an 
 * event to ScreenController class.
 * 
 * ScreenController detects the event and passes it to the
 * current screen.
 * 
 * Current screen receives the event and decide what to do.
 * 
 * @function enable - enable keyboard detection.
 * @function disable - disalble keyboard event.
 */
export class KeysInput {

    // Store all keys being pressed.
    static pressedKeys = new Set();
    // Enable or disable keyboard detection.
    static enabled = false;

    // Reset all keys pressed when window focus is lost.
    static reset = () => {
        this.pressedKeys.clear();
    }

    // Detects key down pressed, and dispatches its event.
    static keyDown = (e) => {
        // Check if keyboard detection is enabled.
        if (!this.enabled) return;
        // Add key pressed to the set.
        const key = e.key.toLowerCase();
        this.pressedKeys.add(key);

        if (debug) console.log("Key Down Pressed at inputHandler.js");

        // Dispatch event and its metadata.
        window.dispatchEvent(new CustomEvent(
            "game:keyDown",
            {
                detail: {
                    pressedKeys: new Set(KeysInput.pressedKeys),
                    key: e.key,
                    type: "down"
                }
            }
        ));
    }

    // Detects key down released, and dispatches its event.
    static keyUp = (e) => {
        // Check if keyboard detection is enabled.
        if (!this.enabled) return;
        // Add key pressed to the set.
        const key = e.key.toLowerCase();
        this.pressedKeys.delete(key);

        if (debug) console.log("Keys Up Pressed at inputHandler.js");

        // Dispatch event and its metadata.
        window.dispatchEvent(new CustomEvent(
            "game:keyUp",
            {
                detail: {
                    pressedKeys: new Set(KeysInput.pressedKeys),
                    key: e.key,
                    type: "up"
                }
            }
        ));
    }

    // Enable keyboard detection.
    static enable() {
        this.enabled = true;
        if (debug) console.log("Keys Enabled.");

        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
        window.addEventListener("blur", this.reset);
    }

    // Disable keyboard detection.
    static disable() {
        this.enabled = false;
        this.pressedKeys.clear();
        if (debug) console.log("Keys Disabled.");

        window.removeEventListener("keydown", this.keyDown);
        window.removeEventListener("keyup", this.keyUp);
        window.removeEventListener("blur", this.reset);
    }

}