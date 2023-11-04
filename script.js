var board = [
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "]
];

var prompt = require("prompt");
var lastPosition = [0,0];
function markBoard(position, mark) {
    for(let i = 5; i>=0; i--){
        if (board[i][position - 1] === " "){
            board[i][position - 1] = mark.toUpperCase();
            lastPosition[0] = i;
            lastPosition[1] = position - 1;
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

function checkWinAcross(player,row){
    var winCount = 0;
    for (let i = 0; i<board[0].length; i++){
        if(board[row][i] === player){
            winCount++;
            if (winCount === 4){
                return true;
            }
        } else{
            winCount = 0;
        }
    }
}
function checkWinDown(player,col){
    var winCount = 0;
    for (let i = 0; i<board.length; i++){
        if(board[i][col] === player){
            winCount++;
            if (winCount === 4){
                return true;
            }
        } else{
            winCount = 0;
        }
    }
}
// check if the player won from top left to bottom right diagonally.
function checkWinTopLeftBottomRightDiagonal(player){
    var winCount = 0;
    var row = lastPosition[0];
    var col = lastPosition[1];
    // move to the highest diagonal Top Left
    while(true){
        if (row === 0 || col === 0){
            break;
        }
        row--;
        col--;
    }
    // go from left to right down
    for(; row <board.length && col<board[0].length;row++,col++){
        if(board[row][col] === player){
            winCount++;
            if (winCount === 4){
                return true;
            }
        } else{
            winCount = 0;
        }
    }
}

// check if the player won from top right to bottom left diagonally.
function checkWinTopRightBottomLeftDiagonal(player){
    var winCount = 0;
    var row = lastPosition[0];
    var col = lastPosition[1];
    // move to the highest diagonal Top Right
    while(true){
        if (row === 0 || col === 6){
            break;
        }
        row--;
        col++;
    }
    // go from right to left down
    for(; row < board.length && col>=0;row++, col--){
        if(board[row][col] === player){
            winCount++;
            if (winCount === 4){
                return true;
            }
        } else{
            winCount = 0;
        }
    }
}

function checkWin(player) {
    var winCount = 0;
    var row;
    var col;
    // check across the X-Axis
    row = lastPosition[0];
    if(checkWinAcross(player,row) === true){
        return true;
    }
    // check up and down
    col = lastPosition[1];
    if(checkWinDown(player,col) === true){
        return true;
    }
    if (checkWinTopLeftBottomRightDiagonal(player) === true){
        return true;
    }

    if(checkWinTopRightBottomLeftDiagonal(player) === true){
        return true;
    }
    return false;
}

function printBoard(){
    // print the board
    var helperString = " | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n-----------------------------\n";
    for (var r = 0; r< board.length; r++){
        for (var c = 0; c<board[0].length; c++){
            helperString += " | " + board[r][c] + "";
        }
        helperString += " |\n-----------------------------\n";
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
var helperString = " | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n-----------------------------\n";
for (var r = 0; r< board.length; r++){
    for (var c = 0; c<board[0].length; c++){
        helperString += " | " + board[r][c] + "";
    }
        helperString += " |\n-----------------------------\n";
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
            if (checkWin(player) === true) {
                console.log('Winner Winner!');
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