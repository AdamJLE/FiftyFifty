var animationSpeed = 200;
var assignedGender;

function start() {
    fadeAllOut();
    $("#game-menu--gender-select").fadeIn(animationSpeed);
}

function jobPrompt(gender) {
    assignedGender = gender;
    fadeAllOut();
    $("#game-menu").css("background-image", "none");
    setTimeout(function () {
        $("#game-menu--starting").fadeIn(animationSpeed);
        setTimeout(function () {
            initChef();
        }, animationSpeed);
    }, animationSpeed);
}

function settings() {
    fadeAllOut();
    setTimeout(function () {
        $("#game-menu--settings-container").fadeIn(animationSpeed);
    }, animationSpeed);
}

function statistics() {
    fadeAllOut();
    setTimeout(function () {
        $("#game-menu--statistics-container").fadeIn(animationSpeed);
    }, animationSpeed);
}

function credits() {
    fadeAllOut();
    setTimeout(function () {
        $("#game-menu--credits-container").fadeIn(animationSpeed);
    }, animationSpeed);
}

function quit() {
    fadeAllOut();
    setTimeout(function () {
        navigator.app.exitApp();
    }, animationSpeed);
}

function mainMenu() {
    fadeAllOut();
    setTimeout(function () {
        $("#game-menu").css("background-image", "");
        $("#game-menu--container").fadeIn(animationSpeed);
    }, animationSpeed);
}

function fadeAllOut() {
    $("#game-menu--gender-select").fadeOut(animationSpeed);
    $("#game-menu--credits-container").fadeOut(animationSpeed);
    $("#game-menu--statistics-container").fadeOut(animationSpeed);
    $("#game-menu--container").fadeOut(animationSpeed);
    $("#game-menu--settings-container").fadeOut(animationSpeed);
}
