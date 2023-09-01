const logicManager = (() => {
    let turn = 0;
    let playerTurn = "X";

    function checkWinner () {
        const board = gameBoard.getBoard();
        let counterX = 0;
        let counterO = 0;

        // store the indices of each correct combination as a 2d array
		const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

        // a player cannot win before turn 5 so no need to run this part until then
        if(turn >= 4){
            for(let i = 0; i < winConditions.length; i++){
                console.log('win condition row: ' + winConditions[i]);
                for(let j = 0; j < winConditions[i].length; j++){
                    if(board[winConditions[i][j]][0] === 'X'){
                        counterX++;
                    }
                    if(board[winConditions[i][j]][0] === 'O'){
                        counterO++;
                    }
                }
                if(counterX === 3){
                    player1.incrementScore();
                    return 'playerX wins';
                }
                if(counterO === 3){
                    player2.incrementScore();
                    return 'playerO wins';
                }
                counterX = 0;
                counterO = 0;
            }
        }
    }

    const getTurn = () => {
        return turn;
    }

    const getPlayerTurn = () => {
        return playerTurn;
    }

    const incrementTurn = () => {
        turn++;
    }

    const swap = () => {
        if(playerTurn === "X"){
            playerTurn = "O";
        }else{
            playerTurn = "X";
        }
    }

    return { checkWinner, getTurn, getPlayerTurn, swap, incrementTurn }
})();

const player = () => {
    let score = 0;
    let name = "";
    const getScore = () => {
        return score;
    };
    const getName = () => {
        return name;
    };
    const incrementScore = () => {
        score += 1;
    };
    const resetScore = () => {
        score = 0;
    }
    const setName = (newName) => {
        name = newName;
    };
    return { getScore, getName, incrementScore, setName, resetScore };
};

const gameBoard = (() => {
    let board = [
        ["", false], ["", false], ["", false],
        ["", false], ["", false], ["", false],
        ["", false], ["", false], ["", false]
    ];

    const init = () => {
        const gameContainer = document.querySelector('.game-container');
        for(let i = 0; i < board.length; i++){
            const cell = document.createElement('div');
            cell.dataset.index = i;
            cell.classList.add("cell-" + i);
            cell.textContent = board[i][0];

            cell.addEventListener('click', (event) => {
                if(board[event.target.dataset.index][1]){
                    alert('already clicked');
                    return;
                }else if(logicManager.getPlayerTurn()){
                    board[event.target.dataset.index][0] = logicManager.getPlayerTurn();
                    board[event.target.dataset.index][1] = true;
                    event.target.textContent = logicManager.getPlayerTurn();
                    logicManager.swap();
                    logicManager.incrementTurn();
                }else {
                    board[event.target.dataset.index][0] = logicManager.getPlayerTurn();
                    board[event.target.dataset.index][1] = true;
                    event.target.textContent = logicManager.getPlayerTurn();
                    logicManager.swap();
                    logicManager.incrementTurn();
                }
                if(logicManager.checkWinner() === 'playerX wins'){
                    display.displayWinner(logicManager.checkWinner());
                }
            });
            gameContainer.appendChild(cell);
        }
    };

    const getBoard = () => {
        return board;
    };

    return { init, getBoard };
})();

const display = (() => {
    const winnerDisplay = document.querySelector('.winner-display');
    
    const displayWinner = (winner = "unknown") => {
        const display = document.createElement('div');
        display.classList.add('winner');
        display.textContent = winner;
        winnerDisplay.appendChild(display);
    }

    return { displayWinner };
})();

gameBoard.init();

const player1 = player();
const player2 = player();






