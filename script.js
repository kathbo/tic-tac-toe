const Board = (() => {
    let boardArr = [ "", "", "", "", "", "", "", "", ""];
    const getBoardArr = () => boardArr;
    const assignToArr = (i, sign, el) => {
        if (boardArr[i] === "") {
            boardArr[i] = sign;
            GameFlow.placeChar(el);
            PickAWinner.seeIfPlayerWon(boardArr, i, boardArr[i])
        }
    };
    const getDOMBoard = document.querySelector('div.gameboard');
    const clearBoard = (elements) => {
        boardArr = [ "", "", "", "", "", "", "", "", ""];
        elements.forEach(el => {
            el.removeChild(el.firstElementChild);
            el.appendChild(document.createElement('div'));
        })
    }
    return {
        getBoardArr,
        assignToArr,
        getDOMBoard,
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
            let dataIndex = e.target.parentElement.getAttribute('data-index');
            Board.assignToArr(dataIndex, activeSign, e.target);
        })
    })
    const placeChar = (el) => {
        let className;
        if (activeSign === 'x') {
            className = 'jsX'
        } else if (activeSign === 'o') {
            className = 'jsO'
        }
        el.classList.add(className);

        switchPlayers();
    }
    const switchPlayers = () => {
        if (player1.isActive) {
            player1.isActive = false;
            player2.isActive = true;
            changeSign(player2);
        } else {
            player2.isActive = false;
            player1.isActive = true;
            changeSign(player1);
        }
    }
    const changeSign = (player) => activeSign = player.sign;
  
    const getPlayer = () => {
        let activePlayer = player1.isActive != true ? player1 : player2;
        return activePlayer.name;
    }
    const addAClass = (arr, className) => {
        for (let x of arr) {
            let el = document.getElementById(`square${x}`).firstElementChild;
            el.classList.add(className);
        }   
    }
    const newGame = () => Board.clearBoard(boardDivs);

    const reset = (msg, loserArr, winnerArr) => {
        if (msg === 'winner determined') {
            addAClass(loserArr, 'signsThatLost');
            addAClass(winnerArr, 'flicker');
            Board.getDOMBoard.classList.add('notClickable');
        } else if (msg === 'tie') {
            Board.getDOMBoard.classList.add('flicker');
        }
        
        document.addEventListener('dblclick', () => {
            newGame();
            Board.getDOMBoard.classList.remove('notClickable');
            Board.getDOMBoard.classList.remove('flicker');
            document.getElementById('dblClickInfo').classList.remove('show');
        })
    } 
    const addScore = (winner) => {
        let wasDesplayed = false;
        if (getScore(player1) > 0 || getScore(player2) > 0 || getScore(tie) > 0) {
            wasDesplayed = true;
        }
        if (!wasDesplayed) document.getElementById('dblClickInfo').classList.add('show');
        winner.score++;
        document.getElementById(`${winner.name}Score`).textContent = winner.score;
    }
    const getScore = (player) => {
        return player.score
    }

    return {
        switchPlayers,
        placeChar,
        getPlayer,
        reset,
        addScore
    }
})()

const PickAWinner = (() => {
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
        let winnerArrs = compareArrays(scoreArray, indexesWCurrentSign, sign);

        if (winnerArrs.length > 0) {
            let winner;
            if (GameFlow.getPlayer() === 'player1') {
                winner = player1
            } else {
                winner = player2
            }
            GameFlow.addScore(winner);
            let arrOfLosers = indexesThatDidntWin(winnerArrs[0]);
            GameFlow.reset('winner determined', arrOfLosers, winnerArrs[0]);
        } else {
            // checks for a tie
            if (!Board.getBoardArr().includes("")) {
                GameFlow.addScore(tie);
                GameFlow.reset('tie', [], []);
            }
        }
    }
    const compareArrays = (scoreArray, arrToCompare, sign) => {
        let result = [];
        for (let indexWCurrentSign of arrToCompare) {
            let copy = [...indexWCurrentSign];
            for (let i = indexWCurrentSign.length - 1; i >= 0; i--) {
              let index = indexWCurrentSign[i]
              if (scoreArray[index] === sign) {
                copy.splice(i, 1)
              }
            }
            if (copy.length === 0) result.push(indexWCurrentSign)
        }
        return result;
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
    return {
        seeIfPlayerWon,
    }
     
})()