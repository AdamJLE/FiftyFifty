/* global bothGamesFinished, totalWage, totalScore, correctTaps, finishedRecipes, wage2, score2, ingredientsClicked2, recipesComplete2 */

var animationSpeed = 200;
var assignedGender;

function start() {
    fadeAllOut();
    $("#game-menu--gender-select").fadeIn(animationSpeed);
}

function pregame() {
    $("#game-menu").css("background-image", "url()");
    $("#pre-game-splash").fadeIn(animationSpeed * 2);
    setTimeout(function () {
        $("#pre-game-splash").fadeOut(animationSpeed * 3);
        setTimeout(function () {
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
    if (bothGamesFinished) {
        if (assignedGender === "male") {
            $("#your-gender").text("Gender: Male");
        } else {
            $("#your-gender").text("Gender: Female");
        }

        var notAssignedGender = assignedGender === "male" ? "Female" : "Male";

        var tempWage = 0;
        if (assignedGender === "male") {
            tempWage = totalScore * 0.012 * 0.72;
        } else {
            tempWage = totalScore * 0.012;
        }

        $("#salary-1").text($("#salary-1").text() + "€" + Math.round(totalWage * 100) / 100 + ", " + notAssignedGender + ": €" + Math.round(tempWage * 100) / 100);
        $("#score-1").text($("#score-1").text() + Math.round(totalScore));
        $("#ingredients-1").text($("#ingredients-1").text() + Math.round(correctTaps));
        $("#recipes-1").text($("#recipes-1").text() + Math.round(finishedRecipes));

        if (assignedGender === "male") {
            tempWage = score2 * 0.012 * 0.72;
        } else {
            tempWage = score2 * 0.012;
        }

        $("#salary-2").text($("#salary-2").text() + "€" + Math.round(wage2 * 100) / 100 + ", " + notAssignedGender + ": €" + Math.round(tempWage * 100) / 100);
        $("#score-2").text($("#score-2").text() + Math.round(score2));
        $("#ingredients-2").text($("#ingredients-2").text() + Math.round(ingredientsClicked2));
        $("#recipes-2").text($("#recipes-2").text() + Math.round(recipesComplete2));

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
