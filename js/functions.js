// ___________________________________________________

// TIMER AND END GAME

function GameOver() {
    clearTimeout(timerTimeout);
    music.pause();
    // siteWindow.removeEventListener('keydown', KeyPressed);
    // siteWindow.removeEventListener('keyup', KeyUp);
    document.getElementById('result').style.display = 'flex';
    if (player.health === enemy.health) {
        document.getElementById('result').innerHTML = 'Draw';
    } else if (player.health > enemy.health) {
        document.getElementById('result').innerHTML = 'Player 1 wins';
    } else if (player.health < enemy.health) {
        document.getElementById('result').innerHTML = 'Player 2 wins';
    }
}

let timer = 60;
let timerTimeout;

function TimerDecrease() {
    timerTimeout = setTimeout(TimerDecrease, 1000)
    if (timer > 0) {
        timer--;
        document.getElementById('timer').innerHTML = timer;
    }
    if (timer == 0) {
        GameOver()
    }
}

// TIMER AND END GAME

// ___________________________________________________

// RectangularColission
function RectangularColission({
    rectangular1, rectangular2
}) {
    // if (rectangular1.attackBox1.width > 0) {
    return (rectangular1.attackBox1.position.x + rectangular1.attackBox1.width >= rectangular2.position.x
        && rectangular1.attackBox1.position.x <= rectangular2.position.x + rectangular2.width
        && rectangular1.attackBox1.position.y + rectangular1.attackBox1.height >= rectangular2.position.y
        && rectangular1.attackBox1.position.y <= rectangular2.position.y + rectangular2.height
        ||
        (rectangular1.attackBox2.position.x + rectangular1.attackBox2.width >= rectangular2.position.x
            && rectangular1.attackBox2.position.x <= rectangular2.position.x + rectangular2.width
            && rectangular1.attackBox2.position.y + rectangular1.attackBox2.height >= rectangular2.position.y
            && rectangular1.attackBox2.position.y <= rectangular2.position.y + rectangular2.height)
        || (rectangular1.attackBox3.position.x + rectangular1.attackBox3.width >= rectangular2.position.x
            && rectangular1.attackBox3.position.x <= rectangular2.position.x + rectangular2.width
            && rectangular1.attackBox3.position.y + rectangular1.attackBox3.height >= rectangular2.position.y
            && rectangular1.attackBox3.position.y <= rectangular2.position.y + rectangular2.height))
    // } else if (rectangular1.attackBox2.width > 0) {
    // return (rectangular1.attackBox2.position.x + rectangular1.attackBox2.width >= rectangular2.position.x
    // && rectangular1.attackBox2.position.x <= rectangular2.position.x + rectangular2.width
    // && rectangular1.attackBox2.position.y + rectangular1.attackBox2.height >= rectangular2.position.y
    // && rectangular1.attackBox2.position.y <= rectangular2.position.y + rectangular2.height)
    // } else if (rectangular1.attackBox3.width > 0) {
    // return (rectangular1.attackBox3.position.x + rectangular1.attackBox3.width >= rectangular2.position.x
    // && rectangular1.attackBox3.position.x <= rectangular2.position.x + rectangular2.width
    // && rectangular1.attackBox3.position.y + rectangular1.attackBox3.height >= rectangular2.position.y
    // && rectangular1.attackBox3.position.y <= rectangular2.position.y + rectangular2.height)
    // }
    // else {
    //     return (rectangular1.attackBox1.position.x + rectangular1.attackBox1.width <= rectangular2.position.x + rectangular2.width
    //         && rectangular1.attackBox1.position.x >= rectangular2.position.x
    //         && rectangular1.attackBox1.position.y + rectangular1.attackBox1.height >= rectangular2.position.y
    //         && rectangular1.attackBox1.position.y <= rectangular2.position.y + rectangular2.height
    //         || (rectangular1.attackBox2.position.x + rectangular1.attackBox2.width <= rectangular2.position.x + rectangular2.width
    //             && rectangular1.attackBox2.position.x >= rectangular2.position.x
    //             && rectangular1.attackBox2.position.y + rectangular1.attackBox2.height >= rectangular2.position.y
    //             && rectangular1.attackBox2.position.y <= rectangular2.position.y + rectangular2.height)
    //         || (rectangular1.attackBox3.position.x + rectangular1.attackBox3.width <= rectangular2.position.x + rectangular2.width
    //             && rectangular1.attackBox3.position.x >= rectangular2.position.x
    //             && rectangular1.attackBox3.position.y + rectangular1.attackBox3.height >= rectangular2.position.y
    //             && rectangular1.attackBox3.position.y <= rectangular2.position.y + rectangular2.height))
    // }

}