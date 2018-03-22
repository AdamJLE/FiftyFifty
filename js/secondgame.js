/* global animationSpeed */

function initSecondGame() {
    setTimeout(function() {
        $("#game").append("<br><br><center class=\"pre-game-header center\">Your Job<h1 id=\"selected-job\">Chef Mk2</h1></center><br><p id=\"selected-job-description\">{{TODO}}</p><button id=\"button-start-job\">Start</button>");
        $("#button-start-job").click(begin2);
        $("#game").fadeIn(animationSpeed);
    }, 800);
}

function begin2() {
    $("#game").fadeOut(animationSpeed);
    setTimeout(function() {
        $("#game").hide();
        $("#game").empty();
        
        $("#game").append(/* whatever the fuck */);
        $("#game").append("<div id=\"game2-board\" class=\"gpu\"></div>");
        $("#game2-board").append("<div class=\"food-item-board tomato-board\"></div>");
        $("#game2-board").append("<div class=\"food-item-board steak-board\"></div>");
        
        $("#game").fadeIn(animationSpeed);
    }, animationSpeed);
}