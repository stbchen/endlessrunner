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

//We are particularly proud of the animations that were included in the game. Specifically 
//the animations for the player character, the enemies and the parallax used in the background. 
//The latter two of which were further enhanced through the use of tweens, allowing us to 
//animate certain static elements and give more life to them. This can be seen with the sprites 
//on the main menu screen, as well as the large group of enemies which can be seen in the 
//background. In terms of technical creativity, the background mob of enemies was interesting 
//to implement because we created them as a group of animated sprites, then used a function to 
//apply the tweens to each one. We then added random numbers to help the mob feel even more chaotic. 

//We were also very happy with how we were able to indicate to the player that they are taking 
//damage. The player starts at the far right and each time they take damage the character gets 
//knocked back closer to where the enemies spawn. Not only do we believe this to be a somewhat 
//more unique way of structuring the game, but it causes there to be a level of dynamic difficulty 
//as you have less time to react as you get knocked back further and further.