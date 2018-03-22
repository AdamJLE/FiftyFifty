/* global animationSpeed, numOfIngredients, recipes, recipeNames */

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
        
        for(var i = 0; i < numOfIngredients; i++) {
            var verbose = getFoodNameById(i+1);
            $("#game2-board").append("<div data-food-id=\"" + (i+1) + "\" class=\"food-item-board " + verbose + "-board\"></div>");
            if(i % 4 === 0) {
                $("." + verbose + "-board").css("left", "0");
            } else if(i % 4 === 1) {
                $("." + verbose + "-board").css("left", "25%");
            } else if(i % 4 === 2) {
                $("." + verbose + "-board").css("left", "50%");
            } else if(i % 4 === 3) {
                $("." + verbose + "-board").css("left", "75%");
            }
            if(i < 4) {
                $("." + verbose + "-board").css("top", "0");
            } else if(i < 8) {
                $("." + verbose + "-board").css("top", "25%");
            } else if(i < 12) {
                $("." + verbose + "-board").css("top", "50%");
            } else if(i < 16) {
                $("." + verbose + "-board").css("top", "75%");
            }
            
            $("." + verbose + "-board").first().click(function() {
                tap($(this));
            });
        }
        
        // display recipe
        var recipe = Math.floor(Math.random() * recipes.length);
        $("#game").append("<div class=\"center game-menu--submenu-title\">" + recipeNames[recipe] + "</div>");
        
        $(".game-menu--submenu-title").append("<br>" + recipes[recipe]);
        
        $("#game").fadeIn(animationSpeed);
    }, animationSpeed);
}

function tap(div) {
    var id = parseInt($(div).attr("data-food-id"));
    console.log(id + ": " + getFoodNameById(id));
    // DO SOMETHING
}