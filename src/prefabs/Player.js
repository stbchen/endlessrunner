class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }
    update() {
        console.log(this.y);
        if (this.y < game.config.height - 140) {
            this.y += 1;
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.y >= game.config.height - 140) {
            for (let i = 0; i < 100; i++) {
                this.jump();
            }
        }
    }

    jump() {
        this.y -= 1;
    }
}