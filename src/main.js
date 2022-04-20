// Endless Runner: Running from the Alien Horde
// Stanley, Nile, Ben
// CMPM/ARTG 120

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let keyUP;

let game = new Phaser.Game(config);