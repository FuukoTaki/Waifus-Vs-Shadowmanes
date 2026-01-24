/**
 * -- SCREEN --
 * 
 * Abstract class to generate different screen types
 * on the game.
 * 
 * The bare minimum is to have load(), remove(), and 
 * handleInput(), in order to make it work properly
 * and iteract with the screen.
 */
export class Screen {

    // Loads the screen for the first time.
    load() {
        throw new Error("Load method not implemented.");
    }

    // Deletes screen.
    remove() {
        throw new Error("Remove method not implemented.");
    }
}