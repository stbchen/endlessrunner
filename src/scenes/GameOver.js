class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    preload() {
        // Replace this with actual
        this.load.image('howto', './assets/howTo.png');
    }
    create() {
        console.log("hi");
        cursors = this.input.keyboard.createCursorKeys();
        this.add.image(0, 0, 'howto').setOrigin(0,0);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.scene.start("menuScene");
        }
    }
}