// Players sprites
class Sprite {
    // Position variable
    constructor({ position, imgSrc, scale = 1, maxFrames = 1, offset = { x: 0, y: 0 } } /*This object is designed to make it easier to access values(position, speed etc.*/) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.img = new Image();
        this.img.src = imgSrc;
        this.scale = scale;
        this.maxFrames = maxFrames;
        this.currentFrames = 0;
        this.framesEllapsed = 0;
        this.framesHold = 20;
        this.offset = offset;
    }

    // Function for drawing players and weapons
    draw() {
        // context.fillStyle = 'rgba(0, 255, 0, 0.5)';
        // context.fillRect(this.position.x, this.position.y, this.width, this.height);

        context.drawImage(
            this.img,
            this.currentFrames * this.img.width / this.maxFrames,
            0,
            this.img.width / this.maxFrames,
            this.img.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.img.width / this.maxFrames * this.scale,
            this.img.height * this.scale
        )
    }

    animateFrames() {
        this.framesEllapsed++;
        if (this.framesEllapsed % this.framesHold === 0) {
            if (this.currentFrames < this.maxFrames - 1) {
                this.currentFrames++;
            } else {
                this.currentFrames = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}

// Players sprites
class Fighter extends Sprite {
    // Position variable
    constructor({ position,
        speed,
        color = 'orange',
        imgSrc, scale = 1,
        maxFrames = 1,
        offset = { x: 0, y: 0 },
        sprites,
        attackBox1 = { offset: {}, width: undefined, height: undefined },
        attackBox2 = { offset: {}, width: undefined, height: undefined },
        attackBox3 = { offset: {}, width: undefined, height: undefined },
        sideCounter,
        takeHitSound,
        attackSound,
        deathSound } /*This object is designed to make it easier to access values(position, speed etc.*/) {

        super({
            position, imgSrc, scale, maxFrames, offset
        })

        this.speed = speed;
        this.height = 120;
        this.width = 50;
        this.lastKey; // This is need when both of directions are pressed
        this.jumpCount = 0;
        this.color = color;
        this.attackBox1 = {
            position: this.position,
            height: attackBox1.height,
            width: attackBox1.width,
            offset: attackBox1.offset
        };
        this.attackBox2 = {
            position: this.position,
            height: attackBox2.height,
            width: attackBox2.width,
            offset: attackBox2.offset
        };
        this.attackBox3 = {
            position: this.position,
            height: attackBox3.height,
            width: attackBox3.width,
            offset: attackBox3.offset
        };
        this.isAttacking = false;
        this.health = 100;

        this.currentFrames = 0;
        this.framesEllapsed = 0;
        this.framesHold = 15;
        this.sprites = sprites;
        this.dead = false;
        this.attackCoolDown = false;
        this.sideCounter = sideCounter;
        this.takeHitSound = new Audio();
        this.takeHitSound.src = takeHitSound;
        this.attackSound = new Audio();
        this.attackSound.src = attackSound;
        this.deathSound = new Audio();
        this.deathSound.src = deathSound;

        for (const sprite in this.sprites) {
            sprites[sprite].img = new Image();
            sprites[sprite].img.src = sprites[sprite].imgSrc
        }
        console.log(this.sprites);
    }

    update() {
        this.draw()
        if (!this.dead) {
            this.animateFrames()

            this.attackBox1.position = {
                x: this.position.x - this.attackBox1.offset.x,
                y: this.position.y - this.attackBox1.offset.y
            };
            this.attackBox2.position = {
                x: this.position.x - this.attackBox2.offset.x,
                y: this.position.y - this.attackBox2.offset.y
            };
            this.attackBox3.position = {
                x: this.position.x - this.attackBox3.offset.x,
                y: this.position.y - this.attackBox3.offset.y
            };

            // context.fillStyle = 'rgba(255, 0, 0, 0.5)';
            // context.fillRect(this.attackBox1.position.x, this.attackBox1.position.y, this.attackBox1.width, this.attackBox1.height);
            // context.fillRect(this.attackBox2.position.x, this.attackBox2.position.y, this.attackBox2.width, this.attackBox2.height);
            // context.fillRect(this.attackBox3.position.x, this.attackBox3.position.y, this.attackBox3.width, this.attackBox3.height);

            this.position.x += this.speed.x;
            this.position.y += this.speed.y;

            if (this.position.y + this.height + this.speed.y >= canvas.height - 45) {
                this.speed.y = 0;
                // this.position.y = 381;
            } else { this.speed.y += gravity; }

            if (this.position.y <= 0) {
                this.speed.y = 1;
            }

            if (this.position.x >= canvas.width - 75) {
                this.position.x = canvas.width - 75;
            } else if (this.position.x <= 25) {
                this.position.x = 25;
            }

        }
    }

    attack() {
        setTimeout(() => {
            this.attackSound.play();
        }, 200);

        if (this.sideCounter === 0) {
            this.switchSprites('attack');
        } else {
            this.switchSprites('attackReversed');
        }

        this.isAttacking = true;

        setTimeout(() => {
            this.attackCoolDown = false;
        }, 800);

    }

    takeHit() {
        this.health -= 10;
        this.takeHitSound.play();
        if (this.health > 0) {
            if (this.sideCounter === 0) {
                this.switchSprites('takeHit');
            } else {
                this.switchSprites('takeHitReversed');
            }
        } else {
            this.deathSound.play();
            if (this.sideCounter === 0) {
                this.switchSprites('death');
            } else {
                this.switchSprites('deathReversed');
            }

        }
    }

    switchSprites(sprite) {
        if (this.img === this.sprites.death.img) {
            if (this.currentFrames === this.sprites.death.maxFrames - 1) {
                this.dead = true
            }
            return
        }
        if (this.img === this.sprites.attack.img && this.currentFrames < this.sprites.attack.maxFrames - 1) { return }
        if (this.img === this.sprites.takeHit.img && this.currentFrames < this.sprites.takeHit.maxFrames - 1) { return }
        switch (sprite) {
            case 'idle':
                if (this.img !== this.sprites.idle.img) {
                    this.maxFrames = this.sprites.idle.maxFrames;
                    this.img = this.sprites.idle.img;
                    this.currentFrames = 0;
                }
                break
            case 'run':
                if (this.img !== this.sprites.run.img) {
                    this.maxFrames = this.sprites.run.maxFrames;
                    this.img = this.sprites.run.img;
                    this.currentFrames = 0;
                }
                break
            case 'jump':
                if (this.img !== this.sprites.jump.img) {
                    this.maxFrames = this.sprites.jump.maxFrames;
                    this.img = this.sprites.jump.img;
                    this.currentFrames = 0;
                }
                break
            case 'fall':
                if (this.img !== this.sprites.fall.img) {
                    this.maxFrames = this.sprites.fall.maxFrames;
                    this.img = this.sprites.fall.img;
                    this.currentFrames = 0;
                }
                break
            case 'attack':
                if (this.img !== this.sprites.attack.img) {
                    this.maxFrames = this.sprites.attack.maxFrames;
                    this.img = this.sprites.attack.img;
                    this.currentFrames = 0;
                }
                break
            case 'takeHit':
                if (this.img !== this.sprites.takeHit.img) {
                    this.maxFrames = this.sprites.takeHit.maxFrames;
                    this.img = this.sprites.takeHit.img;
                    this.currentFrames = 0;
                }
                break
            case 'death':
                if (this.img !== this.sprites.death.img) {
                    this.maxFrames = this.sprites.death.maxFrames;
                    this.img = this.sprites.death.img;
                    this.currentFrames = 0;
                }
                break

        }


        if (this.img === this.sprites.deathReversed.img) {
            if (this.currentFrames === this.sprites.deathReversed.maxFrames - 1) {
                this.dead = true
            }
            return
        }
        if (this.img === this.sprites.attackReversed.img && this.currentFrames < this.sprites.attackReversed.maxFrames - 1) { return }
        if (this.img === this.sprites.takeHitReversed.img && this.currentFrames < this.sprites.takeHitReversed.maxFrames - 1) { return }

        switch (sprite) {
            case 'idleReversed':
                if (this.img !== this.sprites.idleReversed.img) {
                    this.maxFrames = this.sprites.idleReversed.maxFrames;
                    this.img = this.sprites.idleReversed.img;
                    this.currentFrames = 0;
                }
                break
            case 'runReversed':
                if (this.img !== this.sprites.runReversed.img) {
                    this.maxFrames = this.sprites.runReversed.maxFrames;
                    this.img = this.sprites.runReversed.img;
                    this.currentFrames = 0;
                }
                break
            case 'jumpReversed':
                if (this.img !== this.sprites.jumpReversed.img) {
                    this.maxFrames = this.sprites.jumpReversed.maxFrames;
                    this.img = this.sprites.jumpReversed.img;
                    this.currentFrames = 0;
                }
                break
            case 'fallReversed':
                if (this.img !== this.sprites.fallReversed.img) {
                    this.maxFrames = this.sprites.fallReversed.maxFrames;
                    this.img = this.sprites.fallReversed.img;
                    this.currentFrames = 0;
                }
                break
            case 'attackReversed':
                if (this.img !== this.sprites.attackReversed.img) {
                    this.maxFrames = this.sprites.attackReversed.maxFrames;
                    this.img = this.sprites.attackReversed.img;
                    this.currentFrames = 0;
                }
                break
            case 'takeHitReversed':
                if (this.img !== this.sprites.takeHitReversed.img) {
                    this.maxFrames = this.sprites.takeHitReversed.maxFrames;
                    this.img = this.sprites.takeHitReversed.img;
                    this.currentFrames = 0;
                }
                break
            case 'deathReversed':
                if (this.img !== this.sprites.deathReversed.img) {
                    this.maxFrames = this.sprites.deathReversed.maxFrames;
                    this.img = this.sprites.deathReversed.img;
                    this.currentFrames = 0;
                }
                break
        }
    }

}