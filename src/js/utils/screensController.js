export class ScreensController {

    constructor(currentScreen) {
        this.currentScreen = currentScreen;
        this.currentScreen.load();
        this.currentScreen.handleInput();
    }
}