class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
    }
    create() {
    }
    update() {
        this.scene.start("playScene");
    }
}