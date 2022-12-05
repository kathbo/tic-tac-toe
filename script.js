let activePlayer = 'player1'

const Board = (() => {
    let boardArr = ["", "", "", "", "", "", "", "", ""];
    const returnBoardArr = () => {return boardArr}
    return {
        returnBoardArr
    }
})()

const GameFlow = (() => {
    let boardDiv = document.querySelectorAll('div.boardPiece');
    boardDiv.forEach(div => {
        div.addEventListener('click', (e) => {
            assignToArr(e.target.getAttribute('data-index'))
            placeChar(e.target)
        })
    })

    const assignToArr = (i) => {
        Board.returnBoardArr()[i] = 'x'
        console.log(Board.returnBoardArr())
        
    }
    const placeChar = (el) => {
        el.textContent = 'x'
    }
    const switchPlayers = () => {
        if (activePlayer === 'player1') {
            document.getElementById('player1Btn').classList.remove('activeButton');
            document.getElementById('player2Btn').classList.add('activeButton');
            activePlayer = 'player2';
        } else {
            document.getElementById('player2Btn').classList.remove('activeButton');
            document.getElementById('player1Btn').classList.add('activeButton');
            activePlayer = 'player1';
        }
        
    }
    return {
        switchPlayers
    }
})()


let btns = document.querySelectorAll('button.playerBtn');

btns.forEach(button => {
    button.addEventListener('click', () => {
        GameFlow.switchPlayers();
    })
}) 

