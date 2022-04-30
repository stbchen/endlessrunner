class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }
    preload() {
        this.load.image('howto', './assets/howTo.png');
    }
    create() {
        cursors = this.input.keyboard.createCursorKeys();
        this.add.image(0, 0, 'howto').setOrigin(0,0);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.scene.start("menuScene");
        }
        //this.scene.start("playScene");
    }
}