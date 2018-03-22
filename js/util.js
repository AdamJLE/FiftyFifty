/* global animationSpeed */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFoodIdByName(name) {
    switch (name) {
        case "egg":
        {
            return 1;
        }
        case "steak":
        {
            return 2;
        }
        case "bread":
        {
            return 3;
        }
        case "pasta":
        {
            return 4;
        }
        case "cheese":
        {
            return 5;
        }
        case "onion":
        {
            return 6;
        }
        case "ham":
        {
            return 7;
        }
        case "salad":
        {
            return 8;
        }
        case "dough":
        {
            return 9;
        }
        case "tomato":
        {
            return 10;
        }
        case "shrimp":
        {
            return 11;
        }
        case "pineapple":
        {
            return 12;
        }
        case "pear":
        {
            return 13;
        }
        case "mushrooms":
        {
            return 14;
        }
        case "strawberry":
        {
            return 15;
        }
        case "burger":
        {
            return 25;
        }
        case "pizza":
        {
            return 26;
        }
        case "sandwich":
        {
            return 27;
        }
        case "spaghetti":
        {
            return 28;
        }
        case "fruits":
        {
            return 29;
        }
    }
}

function getFoodNameById(id) {
    switch (id) {
        case 1:
        {
            return "egg";

        }
        case 2:
        {
            return "steak";

        }
        case 3:
        {
            return "bread";

        }
        case 4:
        {
            return "pasta";

        }
        case 5:
        {
            return "cheese";

        }
        case 6:
        {
            return "onion";

        }
        case 7:
        {
            return "ham";

        }
        case 8:
        {
            return "salad";

        }
        case 9:
        {
            return "dough";

        }
        case 10:
        {
            return "tomato";

        }
        case 11:
        {
            return "shrimp";

        }
        case 12:
        {
            return "pineapple";

        }
        case 13:
        {
            return "pear";

        }
        case 14:
        {
            return "mushrooms";

        }
        case 15:
        {
            return "strawberry";

        }
        case 16:
        {
            return "apple";

        }
        case 25:
        {
            return "burger";

        }
        case 26:
        {
            return "pizza";

        }
        case 27:
        {
            return "sandwich";

        }
        case 28:
        {
            return "spaghetti";

        }
        case 29:
        {
            return "fruits";

        }
    }
    return name;
}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
