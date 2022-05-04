class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.atlas('player_sprite', './assets/player_atlas.png', './assets/player_atlas.json');

        this.load.spritesheet('player', './assets/runnerFront.png', {frameWidth: 128, frameHeight: 168, startFrame: 0, endFrame: 7});
        this.load.spritesheet('player_back', './assets/runnerBack.png', {frameWidth: 128, frameHeight: 168, startFrame: 0, endFrame: 7});
        this.load.spritesheet('enemy', './assets/enemyFloat.png', {frameWidth: 70, frameHeight: 60, startFrame: 0, endFrame: 5});

        this.load.image('day_bg', './assets/day_background.png');
        this.load.image('day_mg', './assets/day_midground.png');
        this.load.image('day_fg', './assets/day_foreground.png');

        this.load.image('night_bg', './assets/night_background.png');
        this.load.image('night_mg', './assets/night_midground.png');
        this.load.image('night_fg', './assets/night_foreground.png');

        this.load.image('block', './assets/block.png');
        this.load.image('train', './assets/train.png');
    }
    create() {
        this.myAudio = new Audio('./assets/music.mp3'); 
        this.myAudio.pause();
        if (typeof this.myAudio.loop == 'boolean'){
            this.myAudio.loop = true;
        }
        else{
            this.myAudio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }   
        this.myAudio.play();

        // Adding background and player
        this.nightBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'night_bg').setOrigin(0, 0);
        this.nightMidground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'night_mg').setOrigin(0, 0);
        this.nightForeground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'night_fg').setOrigin(0, 0);

        this.dayBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'day_bg').setOrigin(0, 0);
        this.dayMidground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'day_mg').setOrigin(0, 0);
        this.dayForeground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'day_fg').setOrigin(0, 0);
        
        // Add train
        this.train = this.add.tileSprite(0, game.config.height - 75, game.config.width, 75, 'train').setOrigin(0, 0);

        this.anims.create({
            key: 'enemy_float',
            frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 5, first: 0}),
            frameRate: 12,
            repeat: -1
        });

        // variables and settings
        // All the physics on player movement from Nathan Altice's Movement Studies: https://github.com/nathanaltice/MovementStudies
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 3; // change for double/triple/etc. jumps 🤾‍♀️
        this.JUMP_VELOCITY = -700;
        this.physics.world.gravity.y = 2600;
        this.counter = 0;

        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize/2) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        
        // Adding physics player
        this.player = this.physics.add.sprite(3 * game.config.width/4, 550, 'player_sprite').setScale(SCALE);

        this.anims.create({
            key: 'runFront',
            frames: this.anims.generateFrameNames('player_sprite', {
                prefix: 'runFront',
                start: 0,
                end: 7,
                zeroPad: 1
            }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'runBack',
            frames: this.anims.generateFrameNames('player_sprite', {
                prefix: 'runBack',
                start: 0,
                end: 7,
                zeroPad: 1
            }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'damage',
            frames: this.anims.generateFrameNames('player_sprite', {
                prefix: 'damage',
                start: 0,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player_sprite', {
                prefix: 'jump',
                start: 0,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNames('player_sprite', {
                prefix: 'fall',
                start: 0,
                end: 1,
                zeroPad: 1
            }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'land',
            frames: this.anims.generateFrameNames('player_sprite', {
                prefix: 'land',
                start: 0,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'rise',
            frames: this.anims.generateFrameNames('player_sprite', {
                prefix: 'rise',
                start: 0,
                end: 1,
                zeroPad: 1
            }),
            frameRate: 12,
            repeat: -1
        });

        this.player.play('runFront');


        this.player.setCollideWorldBounds(false);
        this.player.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.health = 1;
        this.iframe = 0;
        this.jumps = 0;
        this.lastAnim;
        this.night = false;

        // Adding enemy1
        //this.enemy1 = new Enemy1(this, game.config.width, game.config.height/2, 'enemy1', 0).setOrigin(0, 0);
        this.enemy1 = this.physics.add.sprite(50, game.config.height/2, 'enemy', 0).setOrigin(0, 0);
        this.enemy1.setCollideWorldBounds(false);
        this.enemy1.body.velocity.x += 8;
        this.enemy1.body.setAccelerationX(this.ACCELERATION/15);
        this.enemy1.body.setDragX(this.DRAG);
        this.enemy1.body.allowGravity = false;
        this.despawn(this.enemy1);
        this.delay1 = this.time.now + 3000;

        // Adding enemy2
        this.enemy2 = this.physics.add.sprite(50, game.config.height - 150, 'enemy', 0).setOrigin(0, 0);
        this.enemy2.setCollideWorldBounds(true);
        this.enemy2.body.velocity.x += 10;
        this.enemy2.body.setAccelerationX(this.ACCELERATION/10);
        this.enemy2.body.setDragX(this.DRAG);

        // Adding keyboard controls
        cursors = this.input.keyboard.createCursorKeys();
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Adding collision with ground
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemy2, this.ground);
       
        // Adding collider with enemy2
        this.physics.add.collider(this.player, this.enemy2,() => {
            if (this.time.now > this.iframe) {
                this.hit();
                this.despawn(this.enemy2);
                this.delay = this.time.now + Phaser.Math.Between(3000, 5000);
                // SET IFRAMES (in seconds)
                this.iframe = this.time.now + 2000;
                this.player.body.velocity.x = 0;
            } else {
                this.despawn(this.enemy2);
                this.delay = this.time.now + Phaser.Math.Between(3000, 5000);
                this.player.body.velocity.x = 0;
            }
        });
        this.physics.add.collider(this.player, this.enemy1,() => {
            if (this.time.now > this.iframe) {
                this.hit();
                this.delay1 = this.time.now + Phaser.Math.Between(3000, 5000);
                this.despawn(this.enemy1);
                // SET IFRAMES (in seconds)
                this.iframe = this.time.now + 2000;
                this.player.body.velocity.x = 0;
            } else {
                this.despawn(this.enemy1);
                this.delay1 = this.time.now + Phaser.Math.Between(3000, 5000);
                this.player.body.velocity.x = 0;
            }
        });
        // Setting game over to false
        this.gameOver = false;
        this.e2appear = true;
        this.e1appear = true;
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });
        this.healthText = this.add.text(16, 50, 'Health: ' + this.health, { fontSize: '32px', fill: '#000' });
        this.jumpText = this.add.text(16, 84, 'Jumps: ' + 3, { fontSize: '32px', fill: '#000' });

        // Play animations
        this.time.delayedCall(500, this.lookBack, [], this);

        this.enemy2.anims.play('enemy_float');
        
    }
    
    update() {
        // Check if game is not over
        if (!this.gameOver) {
            // Score
            this.score += 1;
            this.scoreText.text = "Score: " + this.score;
            this.jumpText.text = "Jumps: " + this.jumps;

        // Day/night cycle
        if (this.score % 1500 == 0) {
            this.night = !this.night;
            if (this.night) {
                this.tweens.add({
                    targets: [this.dayBackground, this.dayMidground, this.dayForeground],
                    alpha: 0,
                    duration: 5000,
                    ease: 'Power1'
                })
                this.scoreText.setColor("#FFF");
                this.healthText.setColor("#FFF");
                this.jumpText.setColor("#FFF");
            } else {
                this.tweens.add({
                    targets: [this.dayBackground, this.dayMidground, this.dayForeground],
                    alpha: 1,
                    duration: 5000,
                    ease: 'Power1'
                })
                this.scoreText.setColor("#000");
                this.healthText.setColor("#000");
                this.jumpText.setColor("#000");
            }
        }
            // Moving background
            this.dayBackground.tilePositionX += 2;
            this.nightBackground.tilePositionX += 2;

            this.dayMidground.tilePositionX += 4;
            this.nightMidground.tilePositionX += 4;

            this.dayForeground.tilePositionX += 6;
            this.nightForeground.tilePositionX += 6;

            this.train.tilePositionX += 13;

            //this.enemy1.update();
;            // check if player is grounded
            this.player.isGrounded = this.player.body.touching.down;
            // if so, we have jumps to spare 
            if(this.player.isGrounded && !this.player.body.wasTouching.down) {
                this.player.play('land');
                this.player.on('animationcomplete', () => {
                    this.player.play('runFront');
                });
                this.jumps = this.MAX_JUMPS;
                this.jumping = false;
            } else {
                if(this.player.body.velocity.y > 0 && this.player.body.prev.y > this.player.body.y) {
                    console.log('falling');
                    this.player.play('fall');
                }
            }
            // allow steady velocity change up to a certain key down duration
            // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
            if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
                this.jump();
            }
            // finally, letting go of the UP key subtracts a jump
            // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
            if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
                this.jumps--;
                this.jumping = false;
            }
            if(Phaser.Input.Keyboard.DownDuration(cursors.down, 150)) {
                let fastfall = new Audio('./assets/fastfall.wav');
                fastfall.play();// fastfall sfx here
                this.player.body.velocity.y = -this.JUMP_VELOCITY; // Change this for fast fall speed
                this.jumping = true;
            }

            // Enemy2 update
            if(this.enemy2.x > 800) { // CHANGE this for enemy2 boomerang distance
                this.enemy2.flipX = true;
                this.enemy2.body.setAccelerationX(-this.ACCELERATION/10);
                this.enemy2.body.velocity.x -= 10;
                // see: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html#play__anchor
                // play(key [, ignoreIfPlaying] [, startFrame])
            } else if(this.enemy2.x == 0) {
                this.enemy2.flipX = false;
                this.despawn(this.enemy2);
                this.e2appear = false;
                this.delay = this.time.now + Phaser.Math.Between(500, 2500);
            }

            // enemy1 update
            if (this.enemy1.x > 1100) {
                this.despawn(this.enemy1);
                this.e1appear = false;
                this.delay1 = this.time.now + Phaser.Math.Between(0, 500);
            }
        }

        // Go back to main menu
         if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuScene');
         }

        // reset enemy
        if (this.time.now > this.delay && this.delay != 0) {
            this.spawn(this.enemy2);
            this.enemy2.flipX = false;
            this.enemy2.body.allowGravity = true;
            //this.enemy2.y = game.config.height - 150;
            this.e2appear = true;
            this.delay = 0;
        }
        
        if (this.time.now > this.delay1 && this.delay1 != 0) {
            this.spawn(this.enemy1);
            //this.enemy1.y = game.config.height/2;
            this.enemy1.body.allowGravity = false;
            this.e1appear = true;
            this.delay1 = 0;
        }

        if (this.health <= 0) {
            this.gameOver = true;
            //this.endtext = this.add.text(50, game.config.height/2, 'Game Over, press R to restart', { fontSize: '55px', fill: '#000' });
            this.scene.start("gameoverScene");
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
    }

    despawn(enemy) {
        enemy.setVisible(false);
        enemy.body.velocity.x = 0;
        enemy.body.velocity.y = 0;
        enemy.y = 50;
        enemy.x = 50;
        enemy.body.setAccelerationX(0);
        enemy.body.immovable = true;
        enemy.body.allowGravity = false;
    }

    spawn(enemy) {
        enemy.setVisible(true);
        enemy.y = Phaser.Math.Between(300,500); //change what range enemy will spawn in
        //this.time.now + 6000;
        enemy.body.immovable = false;
        enemy.x = 1;
        enemy.body.velocity.x += 10;
        enemy.body.setAccelerationX(this.ACCELERATION/10);
        enemy.body.setDragX(this.DRAG);
    }
    
    hit() {
        if (this.counter === 0) {
            let hitsound = new Audio('./assets/hurt.wav');
            hitsound.play();// hit sfx here
            this.tweens.add({
                targets: [this.player],
                alpha: 0.5,
                duration: 100,
                repeat: 10,
                yoyo: true,
                ease: 'Power1'
            });
            this.player.play('damage');
            this.health--;
            this.healthText.text = "Health: " + this.health;
        }
        if (this.counter < 20) {
            this.player.x -= 5;
            this.counter++;    
        } else {
            this.player.alpha = 1;
            this.player.play('runFront');
            this.counter = 0;
            return;
        }
        this.time.delayedCall(1, this.hit, [], this);
    }

    jump() {
        let jumpsound = new Audio('./assets/jump.wav');
        jumpsound.play();// jump sfx here
        this.player.body.velocity.y = this.JUMP_VELOCITY;
        this.jumping = true;
        this.player.play('jump');
        this.player.on('animationcomplete', () => {
            this.player.play('rise');
        });
    }

    moveBack() {
        this.player.x -= 1;
    }

    lookBack() {
        let currFrame = this.player.anims.currentFrame.index - 1;
        let lookingBack = Phaser.Math.Between(0, 2);    // random chance that the player sprite is looking back (probability is 1/max+1)

        if (lookingBack === 0) {
            if (this.player.anims.currentAnim.key === 'runFront') {
                this.player.anims.play({key: 'runBack', startFrame: currFrame}, true);
            }
        } else {
            if (this.player.anims.currentAnim.key === 'runBack') {
                this.player.anims.play({key: 'runFront', startFrame: currFrame}, true);
            }
        }
        this.time.delayedCall(500, this.lookBack, [], this);    // delayed recursive calls
    }
}
