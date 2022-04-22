class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.spritesheet('player', './assets/runnerFront.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 11});
        this.load.spritesheet('player_back', './assets/runnerBack.png', {frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 11});

        //this.load.image('player', './assets/player.png');
        this.load.image('background', './assets/background.png');
        this.load.image('block', './assets/block.png');
        this.load.image('enemy1', './assets/enemy1.png');
    }
    create() {
        // Adding background and player
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0, 0);
        //this.p1 = new Player(this, game.config.width/4, game.config.height - 140, 'player').setOrigin(0,0);
        this.anims.create({
            key: 'run_front',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 11, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'run_back',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 11, first: 0}),
            frameRate: 15,
            repeat: -1
        });

        // variables and settings
        // All the physics on player movement from Nathan Altice's Movement Studies: https://github.com/nathanaltice/MovementStudies
        this.ACCELERATION = 1500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.MAX_JUMPS = 2; // change for double/triple/etc. jumps 🤾‍♀️
        this.JUMP_VELOCITY = -700;
        this.physics.world.gravity.y = 2600;
        
        // make ground tiles group
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize/2) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        
        // Adding physics player
        this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'player').setScale(SCALE).setVisible(false);
        this.player.setCollideWorldBounds(true);
        this.player.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        
        // Adding enemy1
        //this.enemy1 = new Enemy1(this, game.config.width, game.config.height/2, 'enemy1', 0).setOrigin(0,0);
        
        // Adding keyboard controls
        cursors = this.input.keyboard.createCursorKeys();
        //keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        this.physics.add.collider(this.player, this.ground);

        this.player.anims.play("run_front");
        this.playerBack = this.add.sprite(this.player.x, this.player.y, 'player_back').setVisible(true);
        this.playerBack.anims.play("run_back");

        /*this.lookTimer = */this.time.delayedCall(500, this.lookBack, [], this);

    }
    update() {
        this.background.tilePositionX += 4;

        this.playerBack.setX(this.player.x);
        this.playerBack.setY(this.player.y);
        

        //this.enemy1.update();
        //this.p1.update();
        
        // check keyboard input

        // if(cursors.left.isDown) {
        //     this.player.body.setAccelerationX(-this.ACCELERATION);
        //     this.player.setFlip(true, false);
        //     // see: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html#play__anchor
        //     // play(key [, ignoreIfPlaying] [, startFrame])
        // } else if(cursors.right.isDown) {
        //     this.player.body.setAccelerationX(this.ACCELERATION);
        //     this.player.resetFlip();
        // } else {
        //     // set acceleration to 0 so DRAG will take over
        //     this.player.body.setAccelerationX(0);
        //     this.player.body.setDragX(this.DRAG);
        // }

        // check if player is grounded
        this.player.isGrounded = this.player.body.touching.down;
        // if so, we have jumps to spare 
        if(this.player.isGrounded) {
            this.jumps = this.MAX_JUMPS;
            this.jumping = false;
        } else {
            // JUMP ANIMATION
            // this.player.anims.play('jump');
        }
        // allow steady velocity change up to a certain key down duration
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.DownDuration__anchor
        if(this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.up, 150)) {
            this.player.body.velocity.y = this.JUMP_VELOCITY;
            this.jumping = true;
        }
        // finally, letting go of the UP key subtracts a jump
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.html#.UpDuration__anchor
        if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
            this.jumps--;
            this.jumping = false;
        }
    }

    lookBack() {
        let lookingBack = Phaser.Math.Between(0, 1);

        if (lookingBack) {
            this.playerBack.setVisible(true);
            this.player.setVisible(false);
            console.log("looking back");
            console.log("playerBack: "+ this.playerBack.visible);
            console.log("player: "+ this.playerBack.visible);
            console.log("///////////////////////");
        } else {
            this.playerBack.setVisible(false);
            this.player.setVisible(true);
            console.log("looking forward");
            console.log("playerBack: "+ this.playerBack.visible);
            console.log("player: "+ this.playerBack.visible);
            console.log("///////////////////////");
        }
        this.time.delayedCall(500, this.lookBack, [], this);
    }
}