// Endless Runner: Outer Space Outlaw
// Stanley Chen, Nile Imtiaz, Ben Putaski
//Completed 5/4/2022
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


//CREATIVE TILT JUSTIFICATION

//We are particularly proud of the animations that were included in the game. Specifically the 
//animations for the Player character and the parallax used in the background. We feel as though 
//they both add a lot to the experience. The group of enemies floating in the background also 
//helps a lot to contribute to the idea of the player character being chased by a mob of enemies 
//slowly gaining on them. 

//Technically speaking, we were very happy with how we were able to indicate to the player that 
//they are taking damage. The player starts at the far right and each time they take damage the 
//character gets knocked back closer to where the enemies spawn. Not only is this a somewhat more 
//unique way of structuring the game, but it causes there to be a level of dynamic difficulty as 
//you have less time to react as you get knocked back further and further.