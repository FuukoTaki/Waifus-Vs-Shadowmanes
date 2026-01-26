// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- IMPORTS --

import { SingleplayerScreen } from "./screens/singleplayerScreen.js";
import { ScreensController } from "./screens/core/screensController.js";
import { spritesSRC, loadSpritesheets } from "./utils/assetsLoader.js";
import { CustomEvents, EventBus } from "./utils/customEvents.js";

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- GLOBAL VARIABLES --

export let canvas, ctx, scale;
let screenManager;

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- GAME SETUP --

window.addEventListener("DOMContentLoaded", () => {

    console.log("All HTML loaded. Ready to write JS now.");

    initialSetup();
});

function initialSetup() {
    setVariables();
    addListeners();
}

function setVariables() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    scale = 1;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    EventBus.addEventListener(CustomEvents.ASSETS_LOAD_SUCCESS, (e) => {
        screenManager = new ScreensController(new SingleplayerScreen());
    });

    EventBus.addEventListener(CustomEvents.ASSETS_LOAD_FAIL, (e) => {
        console.log("FATAL ERROR ON LOADING ASSETS!");
    });

    loadSpritesheets();
}

function addListeners() {
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}