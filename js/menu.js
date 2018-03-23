/* global bothGamesFinished */

var animationSpeed = 200;
var assignedGender;

function start() {
    fadeAllOut();
    $("#game-menu--gender-select").fadeIn(animationSpeed);
}

function pregame() {
    $("#game-menu").css("background-image", "url()");
    $("#pre-game-splash").fadeIn(animationSpeed * 2);
    setTimeout(function() {
        $("#pre-game-splash").fadeOut(animationSpeed * 3);
        setTimeout(function() {
            $("#game-menu--container").fadeIn(animationSpeed * 2);
            $("#game-menu").css("background-image", "");
        }, animationSpeed * 3);
    }, 5000);
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
    if(bothGamesFinished) {
        $("#personal-stats").show();
        $("#check-back").hide();
    } else {
        $("#personal-stats").hide();
        $("#check-back").show();
    }
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
