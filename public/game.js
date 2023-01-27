(function(document, window, undefined){
    "use strict";

    // module pattern
    const gameBoard = (() => {
        // create empty 2D board
        let board = Array(3).fill().map(() => Array(3));
        const fill = (index, marker) => {
            // fill array with specified index
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
            board = Array(3).fill().map(() => Array(3));
        };
        return {
            board,
            fill,
            clear
        }
    })();

    const gameController = (() => {
        const checkWinner = () => {
            // check winner after every turn
        };
        const updateTurn = () => {
            // update player turn if valid move
            playerTurn = playerTurn === playerO ? playerX : playerO;
        };
        const resetGame = () => {
            // reset game if player hits reset button
            playerTurn = playerX;
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
    let playerTurn = playerX;
    let gameState = null;
    
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
            // fill square with marker if no already filled
            if (gameBoard.fill(+s.dataset.index, playerTurn.marker)){
                // update DOM
                s.textContent = playerTurn.marker;
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