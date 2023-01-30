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
            if ([gameBoard.board[0][1], gameBoard.board[1][1], gameBoard.board[2][1]].every((i) => i === activePlayer.marker)){
                return true;
            }
            if ([gameBoard.board[0][0], gameBoard.board[1][0], gameBoard.board[2][0]].every((i) => i === activePlayer.marker)){
                return true;
            }
            if ([gameBoard.board[0][2], gameBoard.board[1][2], gameBoard.board[2][2]].every((i) => i === activePlayer.marker)){
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
            status.textContent = `${activePlayer.name} Turn`;
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
    const playerO = Player("Player 2", "O");
    const playerX = Player("Player 1", "X");
    let activePlayer = playerX;
    let gamePlaying = true;

    let status = document.getElementById("status-text");
    status.textContent = `${activePlayer.name} Turn`;
    
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
                // check if current active player wins
                if (gameController.checkWinner()){
                    // end game
                    gamePlaying = false;
                    // display winner
                    status.textContent = `${activePlayer.name} Wins!`;
                    return;
                }
                // check if the board is filled
                if (gameBoard.isFilled()){
                    // game tied, end game
                    gamePlaying = false;
                    // display tie
                    status.textContent = "It's a Tie. Restart Game?";
                    return;
                }
                // if fill was successful update turn
                gameController.updateTurn();
                status.textContent = `${activePlayer.name} Turn`;
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