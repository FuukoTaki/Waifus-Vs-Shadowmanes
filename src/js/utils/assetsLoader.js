import { CustomEvents, EventBus } from "./customEvents.js";

export const spritesSRC = {};

const spritesURL = {
    princessIDLE: "./src/img/princess/idle.png",
    princessWALK: "./src/img/princess/walk.png",
    princessROLL: "./src/img/princess/roll.png"
};

let debug = false;

export function loadSpritesheets() {

    if (debug) console.log("Loading spritesheets...");

    // Loop through the URL's.
    for (let spritesheet in spritesURL) {
        if (spritesURL.hasOwnProperty(spritesheet)) {

            if (debug) console.log(`${spritesheet}: ${spritesURL[spritesheet]}`);

            // Create spritesheet image.
            let image = new Image();
            image.src = spritesURL[spritesheet];

            // Wait until image is loaded.
            image.onload = () => {

                // Save image on spritesSRC.
                spritesSRC[spritesheet] = image;

                if (debug) console.log(spritesSRC[spritesheet]);

                // Check if spritesSRC has the same length than spritesURL,
                // which means all images are loaded.
                if (Object.keys(spritesSRC).length === Object.keys(spritesURL).length) {

                    if (debug) console.log("All spritesheets loaded succesfully.");
                    if (debug) console.log(spritesSRC);

                    // Call setup to start game config and gameloop.
                    EventBus.dispatchEvent(new Event(CustomEvents.ASSETS_LOAD_SUCCESS));
                }
            };

            // Check if spritesheet does not exist.
            image.onerror = () => {
                if (debug) console.log("SPRITESHEET DOESN'T EXIST!");
                window.dispatchEvent(new Event(CustomEvents.ASSETS_LOAD_FAIL));
            };
        }
    }
}