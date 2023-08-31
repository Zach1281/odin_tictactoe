let turn = 1;
let playerTurn = "X";

const logicManager = (() => {
    let checkGameOver = () => {
        if(turn >= 9){
            alert('game over');
        }
    }

    return { checkGameOver }
})();

const player = () => {
    let score = 0;
    let name = "";
    getScore = () => {
        return score;
    };
    getName = () => {
        return name;
    };
    incrementScore = () => {
        score += 1;
    };
    resetScore = () => {
        score = 0;
    }
    setName = (newName) => {
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

    let init = () => {
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
                }else if(playerTurn === "X"){
                    board[event.target.dataset.index][0] = "X";
                    board[event.target.dataset.index][1] = true;
                    playerTurn = "O";
                    turn++;
                    event.target.textContent = "X";
                }else {
                    board[event.target.dataset.index][0] = "O";
                    board[event.target.dataset.index][1] = true;
                    playerTurn = "X";
                    turn++;
                    event.target.textContent = "O";
                }
            });

            gameContainer.appendChild(cell);
        }
    };

    return { init };
})();

gameBoard.init()

const player1 = player();
const player2 = player();

player1.setName("joe");
console.log(player1.getName());




