const Board = (() => {
    let boardArr = [ "", "", "", "", "", "", "", "", ""];
    const assignToArr = (i, sign, el) => {
        if (boardArr[i] === "") {
            boardArr[i] = sign;
            GameFlow.placeChar(el);
        }
    };
    return {
        assignToArr
    }
})()

const Players = (sign) => {
    this.isActive = false;
    return {sign, isActive}
}

let player1 = Players('x');
let player2 = Players('o');


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
            getSign(player2);
        } else {
            player2.isActive = false;
            document.getElementById('player2Btn').classList.remove('activeButton');
            document.getElementById('player1Btn').classList.add('activeButton');
            player1.isActive = true;
            getSign(player1);
        }
    }
    const getSign = (player) => {
        activeSign = player.sign
    }
    return {
        switchPlayers,
        placeChar
    }
})()

const winningConstitions = () => ({

})()