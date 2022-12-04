let activePlayer = 'player1'
const GameFlow = (() => {
    
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