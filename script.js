var board = [
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "]
];
process.setMaxListeners(0);

var prompt = require("prompt");
prompt.setMaxListeners(0);
function markBoard(position, mark) {
    if (board[0][position - 1] != " "){
    }
    for(let i = 5; i>=0; i--){
        if (board[i][position - 1] === " "){
            board[i][position - 1] = mark.toUpperCase();
            break;
        }
    }
}

var turnCounter = 0;
function checkTie(){
    turnCounter++;
    if (turnCounter >= 42){
        return true;
    }
    return false;
}

function checkWin(){
    
}

function printBoard(){
    // print the empty board
    var helperString = " | 1 | 2 | 3 | 4 | 5 | 6 | 7 \n-----------------------------\n";
    for (var r = 0; r< board.length; r++){
        for (var c = 0; c<board[0].length; c++){
            helperString += " | " + board[r][c] + "";
        }
        helperString += "\n-----------------------------\n";
    }
    console.log(helperString);
}

// console.log(
//     "| 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n" +
//     "-----------------------------\n" +
//     "|   |   |   |   |   |   |   |\n" +
//     );

function isInt(value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

function validateMove(position) {
    if (isInt(position) === true && board[0][position - 1] === ' ') {
        return true;
    }
    return false;
}


console.log("game start...");

// print the empty board
var helperString = " | 1 | 2 | 3 | 4 | 5 | 6 | 7 \n-----------------------------\n";
for (var r = 0; r< board.length; r++){
    for (var c = 0; c<board[0].length; c++){
        helperString += " | " + board[r][c] + "";
    }
        helperString += "\n-----------------------------\n";
}

console.log(helperString);



function playerTurn(player){
    console.log('Your turn player: ' + player);
    console.log("Enter your position");
    prompt.start();
    prompt.get(['position'], function (err, result) {
        console.log(result.position);

        // first validate the user input
        if(validateMove(result.position) === true){
            markBoard(result.position, player);

            printBoard();
            if(checkTie()){
                console.log("It is a tie!");
                return;
            }

            if (player === 'X') {
                playerTurn('O');
            } else {
                playerTurn('X');
            }
        }
        // if there is an error with the user input
        else {
            console.log('incorrect input please try again...');
            playerTurn(player);
        }
    });  
}

playerTurn("X");