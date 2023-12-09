var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

// when the game loads, we need to set the board up with the setGame function.
window.onload = function() {
    setGame();
}

// sets up the website and creates HTML code for us.
function setGame() {
    // variable to store the player turns
    board = [];
    // keep track of the columns so that we know when we run out of space in the columns
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            // creates empty spaces in the row at the start of the game.
            row.push(' ');
            // HTML
            // Creates the HTML using Document Object Model
            let tile = document.createElement("div");           // creates a tile variable that holds an HTML div tag
            tile.id = r.toString() + "-" + c.toString();        // the tile div tag will have an id. examples would be 0-0, 0-1, 1-0, 1-1
            tile.classList.add("tile");                         // adds a 'tile' class to the HTML tag.
            tile.addEventListener("click", setPiece);           // add an event listener property that when click will call the setPiece function
            document.getElementById("board").append(tile);      // adds the HTML tile tag to the HTML board id
        }
        // this creates board row by row.
        board.push(row);
    }
}

function setPiece() {
    // if the game is over, you cannot add pieces and nothing happens
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    // if r is less than 0, then r is a negative number, which is impossible so nothing should happen.
    // basically an error check.
    if (r < 0) { // board[r][c] != ' '
        return;
    }

    // update the board with the correct piece.
    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array
    checkTie(); // check for ties

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let result = document.getElementById("result");
    if (board[r][c] == playerRed) {
        result.innerText = "Red Wins";             
    } else {
        result.innerText = "Yellow Wins";
    }
    gameOver = true;
}

var turns = 0;
function checkTie(){
    let result = document.getElementById("result");
    turns++;
    if (turns === row*columns) {
        result.innerText = "Red and Yellow Tie";
        gameOver = true;
    }
}