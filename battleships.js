"use strict";
var dimension = 9;
var ship_count = 2;
var current_player;
var player1_fired;
var player2_fired;
var player1_sunk;
var player2_sunk;
initPlay();

function finishGame() {
    $("#playfield4").children().unbind("click");
    $("#playfield2").children().unbind("click");
    $("#instructions").children().hide();
    if(current_player === 1) {
        $("#winner").html("Player 1 won!").show();
    } else {
        $("#winner").html("Player 2 won!").show();
    }
    $("#replayButton").unbind("click").click(replay);
    $("#replayButton").show();
}

function hit() {
    if(current_player === 1) {
        player1_fired++;
        player1_sunk++;
        if(player1_sunk === ship_count) {
            console.log("Player 1 won!");
            finishGame();
        }
        $("#shotsFired").html("You have fired " + player1_fired + " shots.");
        $("#sunk").html("You have sunk "+ player1_sunk+ " ships.");

    } else {
        player2_fired++;
        player2_sunk++;
        if(player2_sunk === ship_count) {
            console.log("Player 2 won!");
            finishGame();
        }
        $("#shotsFired").html("You have fired " + player2_fired + " shots.");
        $("#sunk").html("You have sunk "+ player2_sunk+ " ships.");
    }
}

function miss() {
    if(current_player === 1) {
        $("#playfield1").hide();
        $("#playfield2").hide();
        $("#playfield3").show();
        $("#playfield4").show();
        player1_fired++;
        current_player = 2;
        $("#instruction").html("Player 2, fire your cannons!");
        $("#shotsFired").html("You have fired " + player2_fired + " shots.");
        $("#sunk").html("You have sunk "+ player2_sunk+ " ships.");
    } else {
        $("#playfield1").show();
        $("#playfield2").show();
        $("#playfield3").hide();
        $("#playfield4").hide();
        player2_fired++;
        current_player = 1;
        $("#instruction").html("Player 1, fire your cannons!");
        $("#shotsFired").html("You have fired " + player1_fired + " shots.");
        $("#sunk").html("You have sunk "+ player1_sunk+ " ships.");
    }
}

function switchBoard() {
    ship_count = 2;
    $("#shipCount").html("You have " + ship_count + " ships left");
    $("#playfield1").hide();
    $("#playfield3").show();
    $("#instruction").html("Player 2 place your ships");
    $("#placeButton").unbind("click").click(player2Placement);
    console.log("board switched");
}

function finishPlacement() {
    ship_count = 2;
    console.log("placement finished");
    $("#gameContainer").find("*").unbind("click");
    $("#playfield2").children().click(fireShot);
    $("#playfield4").children().click(fireShot);
    $("#playfield3").hide();
    $("#placeButton").hide();
    $("#playfield1").show();
    $("#playfield2").show();
    $("#instruction").html("Player 1, fire your cannons!");
    $("#shipCount").html("There are " + ship_count +" ships on the field.");
    $("#shotsFired").html("You have fired " + player1_fired + " shots.").show();
    $("#sunk").html("You have sunk "+ player1_sunk+ " ships.").show();
}

function replay() {
    player1_sunk = 0;
    player2_sunk = 0;
    player1_fired = 0;
    player2_fired = 0;
    current_player = 1;
    $("#playfield1").children().unbind("click").click(placeShip).html("").css("background-color", "rgb(255, 255, 255)");
    $("#playfield2").children().html("").css("background-color", "rgb(255, 255, 255)");
    $("#playfield3").children().unbind("click").click(placeShip).html("").css("background-color", "rgb(255, 255, 255)");
    $("#playfield4").children().html("").css("background-color", "rgb(255, 255, 255)");
    layout();
}

function initPlay(event) {
    console.log("new game");
    var $containerA;
    var $containerB;
    var $containerC;
    var $containerD;
    for(var i = 0; i < dimension; i++) {
        for(var j = 0; j < dimension; j++) {
            $containerA = $("<div>", {"id": "A" + i+ "" + j, "class": "square"});
            $containerA.addClass("crossed");
            $containerA.css({"top":30*i + "px","left":30*j + "px"});
            $containerB = $("<div>", {"id": "B" + i+ "" + j, "class": "square"});
            $containerB.css({"top":30*i + "px","left":30*j + "px"});
            $containerB.addClass("crossed");
            $containerC = $("<div>", {"id": "C" + i+ "" + j, "class": "square"});
            $containerC.css({"top":30*i + "px","left":30*j + "px"});
            $containerC.addClass("crossed");
            $containerD = $("<div>", {"id": "D" + i+ "" + j, "class": "square"});
            $containerD.css({"top":30*i + "px","left":30*j + "px"});
            $containerD.addClass("crossed");
            $containerA.click(placeShip);
            $containerC.click(placeShip);
            $("#playfield1").append($containerA);
            $("#playfield2").append($containerB);
            $("#playfield3").append($containerC);
            $("#playfield4").append($containerD);
        }
    }
    current_player = 1;
    player1_sunk = 0;
    player2_sunk = 0;
    player1_fired = 0;
    player2_fired = 0;
    layout();
}
function layout() {
    $("#playfield1").show();
    $("#playfield2").hide();
    $("#playfield3").hide();
    $("#playfield4").hide();
    $("#placeButton").unbind("click").click(player1Placement).show();
    $("#instruction").html("Player 1 place your ships").show();
    $("#shipCount").html("You have " + ship_count + " ships left").show();
    $("#validation").hide();
    $("#replayButton").hide();
    $("#winner").hide();
}

function placeShip(event) {
    if(ship_count > 0 && $(event.target).css("background-color") === "rgb(255, 255, 255)") { //white
        $(event.target).css("background-color", "rgb(128, 128, 128)");
        ship_count--;
    } else if($(event.target).css("background-color") === "rgb(128, 128, 128)"){ // grey
        $(event.target).css("background-color", "rgb(255, 255, 255)");
        ship_count++;
    }
    $("#shipCount").html("You have " + ship_count + " ships left");
}

function player1Placement(event) {
    console.log("ok");
    if(ship_count!= 0) {
        $("#validation").show();
        console.log("show");
    } else {
        $("#validation").hide();
        switchBoard();
    }
}

function player2Placement(event) {
    console.log(ship_count);
    if(ship_count!= 0) {
        console.log("ok")
        $("#validation").show();
        console.log("show");
    } else {
        $("#validation").hide();
        console.log("ok2")
        finishPlacement();
    }
}

function fireShot(event) {
    if($(event.target).html() === "X") {
        console.log("already hit");
        return;
    }
    var id = $(event.target)[0].id.substring(1);
    var targetId;
    if(current_player===1) {
        targetId = "C"+id;
    } else {
        targetId = "A"+id;
    }
    console.log($("#"+targetId).css("background-color"));
    $(event.target).html("X");
    $("#"+targetId).html("X");
    if($("#"+targetId).css("background-color")==="rgb(128, 128, 128)") {
        console.log("hit!");
        $(event.target).css("background-color", "grey");
        hit();
    } else {
        console.log("miss");
        miss();
    }
}
