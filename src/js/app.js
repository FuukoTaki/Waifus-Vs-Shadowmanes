// ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- IMPORTS --

import { MenuScreen } from "./screens/menuScreen.js";
import { ScreensController } from "./utils/screensController.js";

// ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- GLOBAL VARIABLES --

let canvas, ctx, scale;

let screenManager;

// ---- ---- ---- ---- ---- ---- ---- ---- ----

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

    screenManager = new ScreensController(new MenuScreen());
}

function addListeners() {
    window.addEventListener("resize", (e) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}