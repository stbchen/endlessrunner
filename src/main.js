// Endless Runner: Running from the Alien Horde
// Stanley, Nile, Ben
// CMPM/ARTG 120

'use strict';

let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play],
};

let keyUP, cursors;
const SCALE = 0.5;
const tileSize = 40;

let game = new Phaser.Game(config);