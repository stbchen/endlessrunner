// Endless Runner: Outer Space Outlaw
// Stanley, Nile, Ben Putaski
// CMPM/ARTG 120

'use strict';

let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play, GameOver],
};

let cursors, keyR, keyESC;
let highScore = 0;
const SCALE = 0.9;
const tileSize = 75;

let game = new Phaser.Game(config);


//We are particular