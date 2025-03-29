let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector('#reset');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.mess-container');
let msg = document.querySelector('#msg');

let turn0 = true; // true for '0', false for 'X'
let gameOver = false;

// Winning Patterns
const win = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [2,4,6],
    [3,4,5], [6,7,8]
];

// Box Click Logic
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;  // Stop clicks if game is over
        
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true; // Prevent further clicks on the same box

        checkWinner();
    });
});

// Check Winner Function
const checkWinner = () => {
    for (let pattern of win) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            disableAllBoxes();
            return;
        }
    }
};

// Show Winner Message
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    gameOver = true;
};

// Disable All Boxes After Win
const disableAllBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    turn0 = true;
    gameOver = false;
};

// Event Listeners for Reset & New Game
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
