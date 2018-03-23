/* global animationSpeed, numOfIngredients, recipes, recipeNames, assignedGender */

var index = 0;
var maxSize;
var currentRecipe;

var score2 = 0;
var ingredientsClicked2 = 0;
var recipesComplete2 = 0;
var wage2 = 0;

var seconds2 = 60 * 0.5;
var timerCountdownIntervalId2;
var renderInterval;
var taskId;

var bothGamesFinished = false;

function initSecondGame() {
    setTimeout(function () {
        $("#game").append("<br><br><center class=\"pre-game-header center\">Your Job<h1 id=\"selected-job\">Serve!</h1></center><br><p id=\"selected-job-description\">Tap the right ingredients in the correct order to make the recipe!</p><button id=\"button-start-job\">Start</button>");
        $("#button-start-job").click(begin2);
        $("#game").fadeIn(animationSpeed);
    }, 800);
}

function begin2() {
    $("#game").fadeOut(animationSpeed);
    taskId = setTimeout(function () {
        $("#game").hide();
        $("#game").empty();
        $("#game").append("<div id=\"score2\">Score: " + score2 + "</div>");
        $("#game").append("<div id=\"salary2\">Salary: €" + Math.floor(wage2) + "</div>");
        $("#game").append("<div id=\"timer2\">Time: " + seconds2 + "</div>");

        $("#game").append("<div id=\"game2-board\" class=\"gpu\"></div>");

        for (var i = 0; i < numOfIngredients; i++) {
            var verbose = getFoodNameById(i + 1);
            $("#game2-board").append("<div data-food-id=\"" + (i + 1) + "\" class=\"food-item-board " + verbose + "-board\"></div>");
            if (i % 4 === 0) {
                $("." + verbose + "-board").css("left", "4%");
            } else if (i % 4 === 1) {
                $("." + verbose + "-board").css("left", "27%");
            } else if (i % 4 === 2) {
                $("." + verbose + "-board").css("left", "50%");
            } else if (i % 4 === 3) {
                $("." + verbose + "-board").css("left", "73%");
            }
            if (i < 4) {
                $("." + verbose + "-board").css("top", "4%");
            } else if (i < 8) {
                $("." + verbose + "-board").css("top", "27%");
            } else if (i < 12) {
                $("." + verbose + "-board").css("top", "51%");
            } else if (i < 16) {
                $("." + verbose + "-board").css("top", "76%");
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
            $(".food-item-hint." + verbose + "-board").css("left", (70 * i) + "px");
        }
        $("#recipe-hint").fadeIn(animationSpeed * 2);
        $("#recipe-title").fadeIn(animationSpeed * 2);

        index = 0;

        $("#game").css("background-image", "url(assets/game2/bg2.jpg)");
        $("#game").fadeIn(animationSpeed);

        renderInterval2 = setInterval(function () {
            if (assignedGender === "female") {
                wage2 = score2 * 0.012 * 0.72;
            } else {
                wage2 = score2 * 0.012;
            }
            $("#timer2").text("Time: " + seconds2);
            $("#score2").text("Score: " + score2);
            $("#salary2").text("Salary: €" + Math.floor(wage2));
        }, 16);

        timerCountdownIntervalId2 = setInterval(function () {
            seconds2--;
            if (seconds2 <= 0) {
                $("#game").empty();
                finish2();
                return;
            }
        }, 1000);
    }, animationSpeed);
}

function tap(div) {
    var id = parseInt($(div).attr("data-food-id"));
    if (id === recipes[currentRecipe][index]) {
        ingredientsClicked2++;
        index++;
        $("#recipe-hint").append("<div class=\"tick-row\" style=\"left: " + (70 * (index - 1)) + "px\"></div>");
        //alert("Correct! " + index + " in a row");
        if (index >= recipes[currentRecipe].length) {
            score2 += getRandomInt(200, 230);

            setTimeout(function () {
                // shuffle recipe
                recipesComplete2++;
                currentRecipe = Math.floor(Math.random() * recipes.length);
                $("#recipe-title").remove();
                $("#recipe-hint").remove();
                $("#game").append("<div id=\"recipe-title\" class=\"center\">" + recipeNames[currentRecipe] + "</div>");

                maxSize = recipes[currentRecipe].length;
                $("#recipe-title").append("<div id=\"recipe-hint\"></div>");
                for (var i = 0; i < recipes[currentRecipe].length; i++) {
                    var verbose = getFoodNameById(recipes[currentRecipe][i]);
                    $("#recipe-hint").append("<div class=\"food-item-hint " + verbose + "-board\"></div>");
                    $(".food-item-hint." + verbose + "-board").css("left", (70 * i) + "px");
                }
                $("#recipe-hint").fadeIn(animationSpeed * 2);
                $("#recipe-title").fadeIn(animationSpeed * 2);

                index = 0;
            }, 1000);
            $("#recipe-hint").fadeOut(animationSpeed * 2);
            $("#recipe-title").fadeOut(animationSpeed * 2);
        }
    } else {
        ingredientsClicked2 -= index;
        index = 0;
        $(".tick-row").remove();
    }
}

function finish2() {
    var speed = 150;
    var temp = animationSpeed;
    animationSpeed = 150;
    clearInterval(timerCountdownIntervalId2);
    clearInterval(renderInterval2);
    clearInterval(taskId);
    $("#game").css("background-image", "url()");
    showText("Finish!", speed, function () {
        setTimeout(function () {
            showText("Finish!", speed, function () {
                setTimeout(function () {
                    showText("Finish!", speed, function () {
                        $("#game").fadeOut(animationSpeed);
                        animationSpeed = temp;
                        setTimeout(function () {
                            $("#game").empty();
                            $("#game").append("<div class=\"announce\">Statistics</div>");
                            if (assignedGender === "male") {
                                $("#game").append("<div class=\"statistic\">Gender: Male</div>");
                            } else {
                                $("#game").append("<div class=\"statistic\">Gender: Female</div>");
                            }
                            $("#game").append("<div class=\"statistic\">Ingredients: " + ingredientsClicked2 + "</div>");
                            $("#game").append("<div class=\"statistic\">Recipes: " + recipesComplete2 + "</div>");
                            $("#game").append("<div class=\"statistic\">Score: " + score2 + "</div>");
                            $("#game").append("<div class=\"statistic\">Salary: €" + Math.floor(wage2 * 100) / 100 + "</div>");

                            $("#game").append("<button onclick=\"endGames()\">Complete</button>");
                            $("#game").fadeIn(animationSpeed);
                        }, speed);
                    });
                }, speed);
            });
        }, speed);
    });
}

function endGames() {
    bothGamesFinished = true;
    $("#game").empty();
    $("#game-menu--container").fadeIn(animationSpeed);
    $("#game-menu").css("background-image", "");
}