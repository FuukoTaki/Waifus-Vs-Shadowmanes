export const EventBus = new EventTarget();

export const CustomEvents = {
    // Assets Loader events.
    ASSETS_LOAD_SUCCESS: "assets:loadSuccess",
    ASSETS_LOAD_FAIL: "assets:loadFail",

    // Input Handler events.
    GAME_KEYUP: "game:keyUp",
    GAME_KEYDOWN: "game:keyDown"
};