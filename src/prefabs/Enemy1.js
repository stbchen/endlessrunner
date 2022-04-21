class Enemy1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // Add enemy1 to scene
        scene.add.existing(this);

        // Set enemy1 speed
        this.moveSpeed = 2;
    }
    update() {
        // Move enemy to the left
        this.x -= this.moveSpeed;

        // If enemy is off screen, reset it
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}
