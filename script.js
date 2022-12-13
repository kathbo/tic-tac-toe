const Board = (() => {
    let boardArr = [ "", "", "", "", "", "", "", "", ""];
    const getBoardArr = () => {
        return boardArr
    };
    const assignToArr = (i, sign, el) => {
        if (boardArr[i] === "") {
            boardArr[i] = sign;
            GameFlow.placeChar(el);
            PickAWinner.seeIfPlayerWon(boardArr, i, boardArr[i])
        }
    };
    const clearBoard = (elements) => {
        boardArr = [ "", "", "", "", "", "", "", "", ""];
        elements.forEach(el => {
            el.textContent = "";
            el.classList.remove('signsThatLost');
        })
    }
    return {
        getBoardArr,
        assignToArr,
        clearBoard
    }
})()

const Players = (name, sign) => {
    this.isActive = false;
    this.score = 0;
    return {name, sign, score, isActive}
}

let player1 = Players('player1', 'x');
let player2 = Players('player2', 'o');
let tie = Players('tie', null);

const GameFlow = (() => {
    
    player1.isActive = true;
    let activeSign = player1.sign;
    let boardDivs = document.querySelectorAll('div.boardPiece');
    boardDivs.forEach(div => {
        div.addEventListener('click', (e) => {
            let dataIndex = e.target.getAttribute('data-index');
            Board.assignToArr(dataIndex, activeSign, e.target);
        })
    })
    let didRoundEnd = false;
    const changeDidRoundEnd = () => {
        didRoundEnd = true
    }
    const placeChar = (el) => {
        el.textContent = activeSign;
        switchPlayers();
    }
    const switchPlayers = () => {
        if (player1.isActive) {
            player1.isActive = false;
            document.getElementById('player1Btn').classList.remove('activeButton');
            document.getElementById('player2Btn').classList.add('activeButton');
            player2.isActive = true;
            changeSign(player2);
        } else {
            player2.isActive = false;
            document.getElementById('player2Btn').classList.remove('activeButton');
            document.getElementById('player1Btn').classList.add('activeButton');
            player1.isActive = true;
            changeSign(player1);
        }
    }
    const changeSign = (player) => {
        activeSign = player.sign
    }
    const getPlayer = () => {
        let activePlayer = player1.isActive != true ? player1 : player2;
        return activePlayer.name;
    }
    const newGame = () => {
        Board.clearBoard(boardDivs)
    }
    const reset = () => {
        document.addEventListener('dblclick', () => {
            if (didRoundEnd == true) newGame();
            console.log(didRoundEnd)
        })
    } 
    const addScore = (winner) => {
        winner.score++;
        document.getElementById(`${winner.name}Score`).textContent = winner.score;
    }
    return {
        switchPlayers,
        placeChar,
        changeDidRoundEnd,
        getPlayer,
        reset,
        addScore
    }
})()

const PickAWinner = (() => {
    let h1 = document.getElementById('winner')
    let winnerIndexes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const seeIfPlayerWon = (scoreArray, i, sign) => {
        let indexesWCurrentSign = [];
        winnerIndexes.map(arr => {
            if (arr.includes(parseInt(i))) indexesWCurrentSign.push(arr)
        });
        for (let indexWCurrentSign of indexesWCurrentSign) {
            let copy = [...indexWCurrentSign];
            for (let i = indexWCurrentSign.length - 1; i >= 0; i--) {
              let index = indexWCurrentSign[i]
              if (scoreArray[index] === sign) {
                copy.splice(i, 1)
              }
            }
            
            if (copy.length === 0) {
                h1.textContent = `${GameFlow.getPlayer()} won`;
                let winner;
                if (GameFlow.getPlayer() === 'player1') {
                    winner = player1
                } else if (GameFlow.getPlayer() === 'player2'){
                    winner = player2
                }
                GameFlow.addScore(winner);
                let arrOfLosers = indexesThatDidntWin(indexWCurrentSign);
                addClass(arrOfLosers, 'signsThatLost');
                addClass(indexWCurrentSign, 'flicker');
                GameFlow.changeDidRoundEnd();
                GameFlow.reset();
                
            }
        } 
        // checks for a tie
        if (!Board.getBoardArr().includes("")) GameFlow.addScore(tie); // include a flickering gray border 
    }

    const indexesThatDidntWin = (winnerIndexes) => {
        let boardArr = Board.getBoardArr()
        let rest = [];
        for (let i = 0; i < 9; i++) {
            if (boardArr[i] !== "") {
                if (!winnerIndexes.includes(i)) rest.push(i);
            }
        }
        return rest
    }

    function addClass(arr, className) {
        for(let x of arr) {
            let el = document.getElementById(`square${x}`);
            el.classList.toggle(className);
        }   
    }
    return {
        seeIfPlayerWon,
    }
     
})()

const End = (() => {

})