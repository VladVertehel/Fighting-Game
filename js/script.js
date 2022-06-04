const music = new Audio();
music.src = 'sounds/bgMusic.mp3';

// ___________________________________________________

// CANVAS

// Canvas variables
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Canvas size
canvas.width = 1024;
canvas.height = 576;

// Background
context.fillStyle = '#1ED6F7';
context.fillRect(0, 0, canvas.width, canvas.height);

// CANVAS

// ___________________________________________________

// PLAYERS

// Gravity for falling down
let gravity = 0.4;

const background = new Sprite({
    position: {
        x: 0,
        y: -200
    },
    imgSrc: 'assets/background.png'
});
const nextBackground = new Sprite({
    position: {
        x: 928,
        y: -200
    },
    imgSrc: 'assets/background.png'
});

// Creating players' positions
const player = new Fighter({
    // Position object
    position: {
        x: 50,
        y: 70
    },
    // Speed object (no moving by default)
    speed: {
        x: 0,
        y: 0
    },

    imgSrc: 'assets/player/Idle.png',
    maxFrames: 11,
    scale: 2.5,
    offset: {
        x: 215,
        y: 165
    },
    sideCounter: 0,
    takeHitSound: 'sounds/playerTakeHit.mp3',
    attackSound: 'sounds/playerAttack.mp3',
    deathSound: 'sounds/playerDeath.mp3',

    sprites: {
        idle: {
            imgSrc: 'assets/player/Idle.png',
            maxFrames: 11,
        },
        run: {
            imgSrc: 'assets/player/Run.png',
            maxFrames: 8,
        },
        jump: {
            imgSrc: 'assets/player/Jump.png',
            maxFrames: 3,
        },
        fall: {
            imgSrc: 'assets/player/Fall.png',
            maxFrames: 3,
        },
        attack: {
            imgSrc: 'assets/player/Attack1.png',
            maxFrames: 7,
        },
        takeHit: {
            imgSrc: 'assets/player/Take-hit.png',
            maxFrames: 4
        },
        death: {
            imgSrc: 'assets/player/Death.png',
            maxFrames: 11
        },





        idleReversed: {
            imgSrc: 'assets/player-reversed/Idle.png',
            maxFrames: 11,
        },
        runReversed: {
            imgSrc: 'assets/player-reversed/Run.png',
            maxFrames: 8,
        },
        jumpReversed: {
            imgSrc: 'assets/player-reversed/Jump.png',
            maxFrames: 3,
        },
        fallReversed: {
            imgSrc: 'assets/player-reversed/Fall.png',
            maxFrames: 3,
        },
        attackReversed: {
            imgSrc: 'assets/player-reversed/Attack1.png',
            maxFrames: 7,
        },
        takeHitReversed: {
            imgSrc: 'assets/player-reversed/Take-hit.png',
            maxFrames: 4
        },
        deathReversed: {
            imgSrc: 'assets/player-reversed/Death.png',
            maxFrames: 11
        }
    },

    attackBox1: {
        offset: {
            x: 25,
            y: 35
        },
        width: 80,
        height: 50
    },
    attackBox2: {
        offset: {
            x: -55,
            y: 25
        },
        width: 50,
        height: 125
    },
    attackBox3: {
        offset: {
            x: 25,
            y: -95
        },
        width: 80,
        height: 20
    }
});

const enemy = new Fighter({
    position: {
        x: canvas.width - 100,
        y: 70
    },
    speed: {
        x: 0,
        y: 0
    },
    sideCounter: 1,
    takeHitSound: 'sounds/enemyTakeHit.mp3',
    attackSound: 'sounds/enemyAttack.mp3',
    deathSound: 'sounds/enemyDeath.mp3',

    imgSrc: 'assets/enemy/Idle.png',
    maxFrames: 11,
    scale: 3,
    offset: {
        x: 205,
        y: 170
    },

    sprites: {
        idle: {
            imgSrc: 'assets/enemy/Idle.png',
            maxFrames: 8,
        },
        run: {
            imgSrc: 'assets/enemy/Run.png',
            maxFrames: 8,
        },
        jump: {
            imgSrc: 'assets/enemy/Jump.png',
            maxFrames: 2,
        },
        fall: {
            imgSrc: 'assets/enemy/Fall.png',
            maxFrames: 2,
        },
        attack: {
            imgSrc: 'assets/enemy/Attack1.png',
            maxFrames: 5,
        },
        takeHit: {
            imgSrc: 'assets/enemy/Take-hit.png',
            maxFrames: 3
        },
        death: {
            imgSrc: 'assets/enemy/Death.png',
            maxFrames: 8
        },




        idleReversed: {
            imgSrc: 'assets/enemy-reversed/Idle.png',
            maxFrames: 8,
        },
        runReversed: {
            imgSrc: 'assets/enemy-reversed/Run.png',
            maxFrames: 8,
        },
        jumpReversed: {
            imgSrc: 'assets/enemy-reversed/Jump.png',
            maxFrames: 2,
        },
        fallReversed: {
            imgSrc: 'assets/enemy-reversed/Fall.png',
            maxFrames: 2,
        },
        attackReversed: {
            imgSrc: 'assets/enemy-reversed/Attack1.png',
            maxFrames: 5,
        },
        takeHitReversed: {
            imgSrc: 'assets/enemy-reversed/Take-hit.png',
            maxFrames: 3
        },
        deathReversed: {
            imgSrc: 'assets/enemy-reversed/Death.png',
            maxFrames: 8
        }
    },

    attackBox1: {
        offset: {
            x: 125,
            y: 50
        },
        width: 70,
        height: 155
    },
    attackBox2: {
        offset: {
            x: 55,
            y: 75
        },
        width: 105,
        height: 50
    },
    attackBox3: {
        offset: {
            x: -50,
            y: 50
        },
        width: 60,
        height: 60
    }
});

// Key-checking object
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
}

// Drawing and animating players
function animate() {
    window.requestAnimationFrame(animate);
    // Drawing field in every frame so that there is an animation of movement and not drawing by characters
    background.update();
    nextBackground.update();
    context.fillStyle = 'rgba(0, 0, 0, 0.2)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    // music.play();

    player.speed.x = 0;

    if (keys.d.pressed && player.lastKey === 'd') {
        player.speed.x = 4;
        player.switchSprites('run');
    } else if (keys.a.pressed && player.lastKey === 'a') {
        player.speed.x = -4;
        player.switchSprites('runReversed');

    } else {
        if (player.sideCounter === 0) {
            player.switchSprites('idle');
        } else {
            player.switchSprites('idleReversed');
        }
    }

    if (player.speed.y < 0) {
        if (player.sideCounter === 0) {
            player.switchSprites('jump');
        } else {
            player.switchSprites('jumpReversed');
        }
    } else if (player.speed.y > 0) {
        if (player.sideCounter === 0) {
            player.switchSprites('fall');
        } else {
            player.switchSprites('fallReversed');
        }
    }

    enemy.speed.x = 0;

    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.speed.x = 4;
        // enemy.attackBox.offset.x = 0;
        enemy.switchSprites('run');
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.speed.x = -4;
        // enemy.attackBox.offset.x = 125;
        enemy.switchSprites('runReversed');
    } else {
        if (enemy.sideCounter === 0) {
            enemy.switchSprites('idle');
        } else {
            enemy.switchSprites('idleReversed');
        }
    }

    if (enemy.speed.y < 0) {
        if (enemy.sideCounter === 0) {
            enemy.switchSprites('jump');
        } else {
            enemy.switchSprites('jumpReversed');
        }
    } else if (enemy.speed.y > 0) {
        if (enemy.sideCounter === 0) {
            enemy.switchSprites('fall');
        } else {
            enemy.switchSprites('fallReversed');
        }
    }





    // Detect colision
    if (RectangularColission({ rectangular1: player, rectangular2: enemy })
        && player.isAttacking && player.currentFrames === 3) {
        player.isAttacking = false;
        console.log('PLAYER hits');
        enemy.takeHit();

        gsap.to('#enemyHP', {
            width: enemy.health + "%"
        })

        console.log("enemy hp:" + enemy.health);
    }

    if (player.isAttacking && player.currentFrames === 3) {
        player.isAttacking = false;
    }

    if (RectangularColission({ rectangular1: enemy, rectangular2: player })
        && enemy.isAttacking && enemy.currentFrames === 3) {
        enemy.isAttacking = false;
        console.log('ENEMY hits');
        player.takeHit();

        gsap.to('#playerHP', {
            width: player.health + "%"
        })

        console.log("player hp:" + player.health);
    }

    if (enemy.isAttacking && enemy.currentFrames === 3) {
        enemy.isAttacking = false;
    }

    // End game
    if (player.health <= 0 || enemy.health <= 0) {
        GameOver();
    }

    if (player.speed.y === 0) {
        player.jumpCount = 0
    }
    if (enemy.speed.y === 0) {
        enemy.jumpCount = 0
    }
}

animate();

// PLAYERS

// ___________________________________________________

// MOVEMENT CONTROL
const siteWindow = window;

function KeyPressed(event) {
    if (!player.dead && !enemy.dead && timer > 0) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                player.sideCounter = 0
                player.offset = {
                    x: 215,
                    y: 165
                }
                player.attackBox1 = {
                    offset: {
                        x: 25,
                        y: 35
                    },
                    width: 80,
                    height: 50
                },
                    player.attackBox2 = {
                        offset: {
                            x: -55,
                            y: 25
                        },
                        width: 50,
                        height: 125
                    },
                    player.attackBox3 = {
                        offset: {
                            x: 25,
                            y: -95
                        },
                        width: 80,
                        height: 20
                    }
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                player.sideCounter = 1
                player.offset = {
                    x: 185,
                    y: 165
                }
                player.attackBox1 = {
                    offset: {
                        x: 5,
                        y: 35
                    },
                    width: 80,
                    height: 50
                },
                    player.attackBox2 = {
                        offset: {
                            x: 55,
                            y: 25
                        },
                        width: 50,
                        height: 125
                    },
                    player.attackBox3 = {
                        offset: {
                            x: 5,
                            y: -95
                        },
                        width: 80,
                        height: 20
                    }
                break
            case 'w':
                if (player.jumpCount < 2) {
                    player.speed.y = -12
                    player.jumpCount++
                } else if (player.speed.y === 0) {
                    player.speed.y = -12
                }
                break
        }
    }
    if (!player.dead && !enemy.dead && timer > 0 && player.attackCoolDown === false) {
        switch (event.key) {
            case ' ':
                console.log(player.attackCoolDown);
                player.attack();
                player.attackCoolDown = true;

                break
        }
    }

    if (!player.dead && !enemy.dead && timer > 0) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                enemy.sideCounter = 0
                enemy.offset = {
                    x: 195,
                    y: 170
                }
                enemy.attackBox1 = {
                    offset: {
                        x: -105,
                        y: 50
                    },
                    width: 70,
                    height: 155
                },
                    enemy.attackBox2 = {
                        offset: {
                            x: 0,
                            y: 75
                        },
                        width: 105,
                        height: 50
                    },
                    enemy.attackBox3 = {
                        offset: {
                            x: 60,
                            y: 50
                        },
                        width: 60,
                        height: 60
                    }
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                enemy.sideCounter = 1
                enemy.offset = {
                    x: 205,
                    y: 170
                }
                enemy.attackBox1 = {
                    offset: {
                        x: 125,
                        y: 50
                    },
                    width: 70,
                    height: 155
                },
                    enemy.attackBox2 = {
                        offset: {
                            x: 55,
                            y: 75
                        },
                        width: 105,
                        height: 50
                    },
                    enemy.attackBox3 = {
                        offset: {
                            x: -50,
                            y: 50
                        },
                        width: 60,
                        height: 60
                    }
                break
            case 'ArrowUp':
                if (enemy.jumpCount < 2) {
                    enemy.speed.y = -12
                    enemy.jumpCount++
                } else if (enemy.speed.y === 0) {
                    enemy.speed.y = -12
                }
                break
        }

    }

    if (!player.dead && !enemy.dead && timer > 0 && enemy.attackCoolDown === false) {
        switch (event.key) {
            case 'Enter':
                console.log(enemy.attackCoolDown);
                enemy.attack();
                enemy.attackCoolDown = true;

                break
        }
    }
}
function KeyUp() {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
}

document.getElementById('btn').addEventListener('click', () => {
    siteWindow.addEventListener('keydown', KeyPressed);
    siteWindow.addEventListener('keyup', KeyUp);
})


// MOVEMENT CONTROL

// ___________________________________________________

// TIMER AND END GAME

function GameStart() {
    music.play();
    document.getElementById('controls').style.display = 'none';
    document.getElementById('btn').removeEventListener('click', GameStart);
    setTimeout(() => {
        TimerDecrease()
    }, 1000);
}

document.getElementById('btn').addEventListener('click', GameStart);
// TIMER AND END GAME

// ___________________________________________________