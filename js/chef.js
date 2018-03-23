/* global animationSpeed, assignedGender */

var totalScore = 0; // 8076, 8400, 8684, 9366, 9966, 10969, 12077, 13550, 16500
var totalWage = 0;
var correctTaps = 0;
var finishedRecipes = 0;

var numOfIngredients = 16;

var maxScore = 22500;
var timer = 1000 * 60 * 0.5;
var seconds = timer / 1000;
var intervalId;
var renderIntervalId;
var timerCountdownIntervalId;

var recipes = [
    [3, 2, 8, 10, 6], // burger
    [2, 4, 10], // spaghetti
    [3, 5, 10, 6, 8], // sandwich
    [1, 3, 2, 5, 7], // francesinha
    [9, 5, 7, 10, 14], // pizza
    [11, 8, 6, 10], // shrimp salad
    [12, 13, 16, 15] // fruit salad
];

var recipeNames = ["Burger", "Spaghetti", "Sandwich", "Francesinha", "Pizza", "Shrimp Salad", "Fruit Salad"];

var currentRecipe = recipes[Math.floor(Math.random() * recipes.length)];

function initChef() {
    $("#game-menu--starting").fadeOut(animationSpeed);
    $("#button-start-job").click(begin);

    setTimeout(function () {
        $("#game").fadeIn(animationSpeed);
    }, animationSpeed);
}

function begin() {
    showText("Start!", 800, function () {
        $("#game").css("background-image", "url(assets/background-1.png)");
        $("#game").append("<div id=\"bowl\"></div>");
        $("#game").append("<div id=\"score-counter\">Score: " + Math.floor(totalScore) + "</div>");
        $("#game").append("<div id=\"wage-counter\">Salary: €" + Math.floor(totalWage) + "</div>");
        $("#game").append("<div id=\"timer\">Time: " + seconds + "</div>");
        $("#game").append("<div id=\"current-recipe\"></div>");
        for (var i = 0; i < currentRecipe.length; i++) {
            $("#current-recipe").append("<div class=\"current-food-item item-" + (i + 1) + " " + getFoodNameById(currentRecipe[i]) + "\"></div>");
        }
        $("#current-recipe").css("height", ((60 * currentRecipe.length) + 10) + "px");

        intervalId = setInterval(function () {
            var x = getRandomInt(0, ($("#game").height() / 2) - 60);
            var y = getRandomInt(0, $("#game").width() - 60);
            spawnFood(x, y);
        }, 300);

        renderIntervalId = setInterval(function () {
            if (assignedGender === "female") {
                totalWage = totalScore * 0.012 * 0.72;
            } else {
                totalWage = totalScore * 0.012;
            }
            $("#score-counter").html("Score: " + Math.floor(totalScore));
            $("#wage-counter").html("Salary: €" + Math.floor(totalWage));
            $("#timer").html("Time: " + seconds);
            $(".food").each(function (index) {
                var currentX = $(".food").eq(index).css("left");
                var currentY = $(".food").eq(index).css("top");
                if (currentX === undefined || currentY === undefined) {
                    $(".food").eq(index).children().remove();
                    $(".food").eq(index).remove();
                    return;
                }
                currentX = currentX.replace("px", "");
                currentY = parseInt(currentY.replace("px", "")) + 2;
                $(".food").eq(index).css("top", currentY);
                if (currentY > $("#game").height()) {
                    $(".food").eq(index).children().remove();
                    $(".food").eq(index).remove();
                    return;
                }
            });

            if (totalScore >= maxScore) {
                finish();
            }

        }, 16);

        timerCountdownIntervalId = setInterval(function () {
            seconds--;
        }, 1000);

        setTimeout(finish, timer);
    });
}

function finish() {
    var speed = 150;
    var temp = animationSpeed;
    animationSpeed = 150;
    $("#game").css("background-image", "url()");
    clearInterval(intervalId);
    clearInterval(renderIntervalId);
    clearInterval(timerCountdownIntervalId);
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
                            $("#game").append("<div class=\"statistic\">Ingredients: " + correctTaps + "</div>");
                            $("#game").append("<div class=\"statistic\">Recipes: " + finishedRecipes + "</div>");
                            $("#game").append("<div class=\"statistic\">Score: " + Math.round(totalScore) + "</div>");
                            $("#game").append("<div class=\"statistic\">Salary: €" + Math.round(totalWage * 100) / 100 + "</div>");
                            
                            var tempWage = 0;
                            if (assignedGender === "male") {
                                tempWage = totalScore * 0.012 * 0.72;
                            } else {
                                tempWage = totalScore * 0.012;
                            }
                            
                            $("#game").append("<div class=\"statistic\">The opposite gender would be paid: €" + Math.round(tempWage * 100) / 100 + "</div>");

                            $("#game").append("<button onclick=\"nextGame()\">Continue</button>");
                            $("#game").fadeIn(animationSpeed);
                        }, speed);
                    });
                }, speed);
            });
        }, speed);
    });
}

function nextGame() {
    $("#game").fadeOut(animationSpeed);
    setTimeout(function () {
        $("#game").empty();
        initSecondGame();
    }, animationSpeed);
}

function showText(text, millis, callback) {
    $("#game").fadeOut(animationSpeed);
    setTimeout(function () {
        $("#game").empty();
        $("#game").append("<div class=\"announce\">" + text + "</div>");
        $("#game").fadeIn(animationSpeed);
        setTimeout(function () {
            $(".announce").fadeOut(animationSpeed);
            setTimeout(function () {
                $("#game").empty();
                callback();
            }, animationSpeed);
        }, millis);
    }, animationSpeed);
}

function spawnFood(x, y) {
    var type = Math.floor((Math.random() * numOfIngredients) + 1);
    var verbose = getFoodNameById(type);
    $("#game").append("<div data-food-id=\"" + type + "\" class=\"food " + verbose + " gpu\" style=\"top: " + x + "px; left: " + y + "px;\" onclick=\"deleteFood(this, true)\"></div>");
}

function deleteFood(element, tapped) {
    $("#current-recipe").css("height", ((60 * currentRecipe.length) + 10) + "px");
    if (tapped) {

        var distanceToBottom = $("#game").height() - $(element).css("top").replace("px", "");
        var type = $(element).attr("data-food-id");
        var score = mapRange(distanceToBottom, 0, 640, 100, 120);

        var found = false;
        for (var i = 0; i < currentRecipe.length; i++) {
            var temp = currentRecipe[i];
            if (type == temp) {
                found = true;
                totalScore += score;
                // tooltip?
                $(element).append("<div class=\"tooltip-number\">+" + Math.round(score) + "</div>");
                correctTaps++;
                $(element).css("background-image", "url()");
                $(element).off("click");
                $(element).children().off("click");

                $("#current-recipe .current-food-item.item-" + (i + 1)).each(function (index) {
                    var classes = $(this).attr("class");
                    classes = classes.replace("current-food-item", "")
                            .replace("item-1", "")
                            .replace("item-2", "")
                            .replace("item-3", "")
                            .replace("item-4", "")
                            .replace("item-5", "")
                            .replace("item-6", "")
                            .replace("item-7", "")
                            .replace("item-8", "")
                            .trim();
                    $(".current-food-item." + classes).first().addClass("food-crossed-off");
                });

                // check to see if we should get a new recipe here
                if ($(".current-food-item").not(".food-crossed-off").length === 0) {
                    finishedRecipes++;
                    currentRecipe = recipes[Math.floor(Math.random() * recipes.length)];
                    $("#current-recipe").empty();
                    for (var i = 0; i < currentRecipe.length; i++) {
                        $("#current-recipe").append("<div class=\"current-food-item item-" + (i + 1) + " " + getFoodNameById(currentRecipe[i]) + "\"></div>");
                    }
                    $("#current-recipe").css("height", ((60 * currentRecipe.length) + 10) + "px");
                }


                setTimeout(function () {
                    $(element).children(".tooltip-number").fadeOut(animationSpeed);
                    setTimeout(function () {
                        $(element).children().remove();
                        $(element).remove();
                    }, animationSpeed);
                }, animationSpeed);

                return;
            }
        }

        if (!found) {
            $(element).append("<div class=\"tooltip-number negative\">-50</div>");
            $(element).css("background-image", "url()");
            $(element).off("click");
            $(element).children().off("click");
            $(element).children(".tooltip-number").fadeOut(animationSpeed);
            setTimeout(function () {
                $(element).children(".tooltip-number").fadeOut(animationSpeed);
                setTimeout(function () {
                    $(element).children().remove();
                    $(element).remove();
                }, animationSpeed);
            }, animationSpeed);
            totalScore -= 50;
        }

    }

}
