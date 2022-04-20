// Endless Runner: Running from the Alien Horde
// Stanley, Nile, Ben
// CMPM/ARTG 120

let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    scene: [Menu, Play],
};

let keyUP;

let game = new Phaser.Game(config);