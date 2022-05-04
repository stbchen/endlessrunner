class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    preload() {
        // Replace this with actual
        this.load.image('gameover', './assets/gameover.png');
    }
    create() {
        console.log("hi");
        cursors = this.input.keyboard.createCursorKeys();
        this.gameover = this.add.image(0, 0, 'gameover').setOrigin(0,0);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.scene.start("menuScene");
        }
    }
}