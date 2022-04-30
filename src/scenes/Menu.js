class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image('menu', './assets/menu.png');
        this.load.image('howto', './assets/howTo.png');
    }
    create() {
        this.inst = false;
        this.menuimg = this.add.image(0, 0, 'menu').setOrigin(0, 0);
        cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.down) && this.inst == false) {
            this.instimg = this.add.image(0, 0, 'howto').setOrigin(0,0);
            this.inst = true;
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.left) && this.inst == true) {
            //this.add.image(0, 0, 'menu').setOrigin(0,0);
            this.instimg.destroy();
            this.inst = false;
        }
    }
}