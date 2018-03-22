/* global animationSpeed, numOfIngredients, recipes, recipeNames */

var index = 0;
var maxSize;
var currentRecipe;

function initSecondGame() {
    setTimeout(function () {
        $("#game").append("<br><br><center class=\"pre-game-header center\">Your Job<h1 id=\"selected-job\">Serve!</h1></center><br><p id=\"selected-job-description\">Tap the right ingredients in the correct order to make the recipe!</p><button id=\"button-start-job\">Start</button>");
        $("#button-start-job").click(begin2);
        $("#game").fadeIn(animationSpeed);
    }, 800);
}

function begin2() {
    $("#game").fadeOut(animationSpeed);
    setTimeout(function () {
        $("#game").hide();
        $("#game").empty();

        $("#game").append("<div id=\"game2-board\" class=\"gpu\"></div>");

        for (var i = 0; i < numOfIngredients; i++) {
            var verbose = getFoodNameById(i + 1);
            $("#game2-board").append("<div data-food-id=\"" + (i + 1) + "\" class=\"food-item-board " + verbose + "-board\"></div>");
            if (i % 4 === 0) {
                $("." + verbose + "-board").css("left", "0");
            } else if (i % 4 === 1) {
                $("." + verbose + "-board").css("left", "25%");
            } else if (i % 4 === 2) {
                $("." + verbose + "-board").css("left", "50%");
            } else if (i % 4 === 3) {
                $("." + verbose + "-board").css("left", "75%");
            }
            if (i < 4) {
                $("." + verbose + "-board").css("top", "0");
            } else if (i < 8) {
                $("." + verbose + "-board").css("top", "25%");
            } else if (i < 12) {
                $("." + verbose + "-board").css("top", "50%");
            } else if (i < 16) {
                $("." + verbose + "-board").css("top", "75%");
            }

            $("." + verbose + "-board").first().click(function () {
                tap($(this));
            });
        }

        // display recipe
        currentRecipe = Math.floor(Math.random() * recipes.length);
        $("#recipe-title").remove();
        $("#recipe-hint").remove();
        $("#game").append("<div id=\"recipe-title\" class=\"center\">" + recipeNames[currentRecipe] + "</div>");

        maxSize = recipes[currentRecipe].length;
        $("#recipe-title").append("<div id=\"recipe-hint\"></div>");
        for (var i = 0; i < recipes[currentRecipe].length; i++) {
            var verbose = getFoodNameById(recipes[currentRecipe][i]);
            $("#recipe-hint").append("<div class=\"food-item-hint " + verbose + "-board\"></div>");
            $(".food-item-hint." + verbose + "-board").css("left", (65 * i) + "px");
        }

        $("#game").css("background-image", "url(assets/game2/bg2.jpg)");
        $("#game").fadeIn(animationSpeed);
    }, animationSpeed);
}

function tap(div) {
    var id = parseInt($(div).attr("data-food-id"));
    if (id === recipes[currentRecipe][index]) {
        index++;
        alert("Correct! " + index + " in a row");
        if (index >= recipes[currentRecipe].length) {
            currentRecipe = Math.floor(Math.random() * recipes.length);
            $("#recipe-title").remove();
            $("#recipe-hint").remove();
            $("#game").append("<div id=\"recipe-title\" class=\"center\">" + recipeNames[currentRecipe] + "</div>");

            maxSize = recipes[currentRecipe].length;
            $("#recipe-title").append("<div id=\"recipe-hint\"></div>");
            for (var i = 0; i < recipes[currentRecipe].length; i++) {
                var verbose = getFoodNameById(recipes[currentRecipe][i]);
                $("#recipe-hint").append("<div class=\"food-item-hint " + verbose + "-board\"></div>");
                $(".food-item-hint." + verbose + "-board").css("left", (65 * i) + "px");
            }

            index = 0;
        }
    } else {
        index = 0;
        alert("Incorrect!");
    }
}