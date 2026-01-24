// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- IMPORTS --

import { SingleplayerScreen } from "./screens/singleplayerScreen.js";
import { ScreensController } from "./screens/core/screensController.js";

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

    screenManager = new ScreensController(new SingleplayerScreen());
}

function addListeners() {
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}