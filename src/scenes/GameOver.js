class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    init(data) {
        this.score = data.score;
    }
    preload() {
        // Replace this with actual
        this.load.image('gameover', './assets/gameover.png');
    }
    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        cursors = this.input.keyboard.createCursorKeys();
        this.gameover = this.add.image(0, 0, 'gameover').setOrigin(0,0);

        this.lastHighScore = highScore;

        this.time.delayedCall(500, () => {
            this.add.text(game.config.width/8, game.config.height/2, 'YOUR SCORE\nTHIS RUN:\n\n', { fontSize: '32px', fill: '#FFF', align: 'center' }).setOrigin(0.5, 0.5);
        });
        this.time.delayedCall(1000, () => {
            this.add.text(game.config.width/8, game.config.height/2, '\n\n\n\n' + Math.floor(this.score/10), { fontSize: '32px', fill: '#FFF', align: 'center' }).setOrigin(0.5, 0.5);
        });
        this.time.delayedCall(1500, () => {
            this.add.text(7*game.config.width/8, game.config.height/2, 'YOUR LAST\nHIGH SCORE:\n\n', { fontSize: '32px', fill: '#FFF', align: 'center' }).setOrigin(0.5, 0.5);
        });
        this.time.delayedCall(2000, () => {
            this.add.text(7*game.config.width/8, game.config.height/2, '\n\n\n\n' + Math.floor(this.lastHighScore/10), { fontSize: '32px', fill: '#FFF', align: 'center' }).setOrigin(0.5, 0.5);
        });

        if (this.score > highScore) {
            highScore = this.score;
            this.time.delayedCall(2750, () => {
                this.add.text(game.config.width/8, game.config.height/2 + 100, 'NEW BEST!', { fontSize: '16px', fill: '#FFF', align: 'center' }).setOrigin(0.5, 0.5);
            });
        } else {
            this.time.delayedCall(2750, () => {
                this.add.text(game.config.width/8, game.config.height/2 + 100, 'TRY AGAIN!', { fontSize: '16px', fill: '#FFF', align: 'center' }).setOrigin(0.5, 0.5);
            });
        }
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("menuScene");
        }
    }
}