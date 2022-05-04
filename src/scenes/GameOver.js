class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    preload() {
        // Replace this with actual
        this.load.image('gameover', './assets/gameover.png');
    }
    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        cursors = this.input.keyboard.createCursorKeys();
        this.gameover = this.add.image(0, 0, 'gameover').setOrigin(0,0);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("menuScene");
        }
    }
}