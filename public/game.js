(function(document, window, undefined){
    "use strict";

    // module pattern
    const gameBoard = (() => {
        // create empty 2D board
        let board = Array(3).fill().map(() => Array(3).fill(""));
        const fill = (index, marker) => {
            // fill array at the specified index
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    if (index === ((i * 3) + (j + 1)) && board[i][j]){
                        return false;
                    };
                    if (index === ((i * 3) + (j + 1)) && !board[i][j]){
                        board[i][j] = marker;
                        return true;
                    };
                }
            }
        };
        const clear = () => {
            // clear board
            board.forEach((arr) => arr.fill(""));
        };
        const isFilled = () => {
            // identify if the whole board is filled
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    if (!board[i][j]){
                        return false;
                    }
                }
            }
            return true;
        };
        return {
            board,
            fill,
            clear,
            isFilled
        }
    })();

    const gameController = (() => {
        const checkWinner = () => {
            // check winner after every turn
            if (gameBoard.board[0].every((i) => i === activePlayer.marker)){
                return true;
            }
            if (gameBoard.board[1].every((i) => i === activePlayer.marker)){
                return true;
            }
            if (gameBoard.board[2].every((i) => i === activePlayer.marker)){
                return true;
            }
            if ([gameBoard.board[0][0], gameBoard.board[1][1], gameBoard.board[2][2]].every((i) => i === activePlayer.marker)){
                return true;
            }
            if ([gameBoard.board[0][2], gameBoard.board[1][1], gameBoard.board[2][0]].every((i) => i === activePlayer.marker)){
                return true;
            }
            return false;
        };
        const updateTurn = () => {
            // update player turn if valid move
            activePlayer = activePlayer === playerO ? playerX : playerO;
        };
        const resetGame = () => {
            // reset game if player hits reset button
            activePlayer = playerX;
            gamePlaying = true;
        };

        return {
            checkWinner,
            updateTurn,
            resetGame
        }
    })();

    const Player = function(name, marker) {
        return {name, marker};
    };

    // initialize game
    const playerO = Player("player 1", "O");
    const playerX = Player("player 2", "X");
    let activePlayer = playerX;
    let gamePlaying = true;
    
    // create board in DOM
    const boardNode = document.querySelector(".board");
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.dataset.index = (i * 3) + (j + 1);
            boardNode.append(square);
        }
    }

    const squares = document.querySelectorAll(".square");
    Array.from(squares).forEach((s) => {
        s.addEventListener("click", function(event){
            // game over
            if (!gamePlaying) return;

            // fill square with marker if no already filled
            if (gameBoard.fill(+s.dataset.index, activePlayer.marker)){
                // update DOM
                s.textContent = activePlayer.marker;
                console.log(gameBoard.board);
                // check if current active player wins
                if (gameController.checkWinner()){
                    // end game
                    gamePlaying = false;
                    // display winner
                    return;
                }
                // check if the board is filled
                if (gameBoard.isFilled()){
                    // game tied, end game
                    gamePlaying = false;
                    // display tie
                    return;
                }
                // if fill was successful update turn
                gameController.updateTurn();
            };

        });
    })

    const resetBtn = document.getElementById("resetButton");
    resetBtn.addEventListener("click", function(event){
        gameBoard.clear();
        gameController.resetGame();
        Array.from(squares).forEach((s) => {
            s.textContent = "";
        })
    });

})(document, window);