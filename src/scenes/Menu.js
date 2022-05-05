class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image('menu', './assets/main_menu.png');
        this.load.image('howto', './assets/howTo.png');

        this.load.image('day_bg', './assets/day_background.png');
        this.load.image('day_mg', './assets/day_midground.png');
        this.load.image('day_fg', './assets/day_foreground.png');

        this.load.image('title_enemy1', './assets/title_enemy1.png');
        this.load.image('title_enemy2', './assets/title_enemy2.png');
        this.load.image('title_enemy3', './assets/title_enemy3.png');
        this.load.image('title_logo', './assets/title_logo.png');
        this.load.image('title_player', './assets/title_player.png');
        this.load.image('title_text', './assets/title_text.png');
        this.load.image('credits', './assets/credits.png');
    }
    create() {
        this.inst = false;
        this.menuimg = this.add.image(0, 0, 'menu').setOrigin(0, 0);
        cursors = this.input.keyboard.createCursorKeys();

        this.menu_bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'day_bg').setOrigin(0, 0);
        this.menu_mg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'day_mg').setOrigin(0, 0);
        this.menu_fg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'day_fg').setOrigin(0, 0);
        this.credits = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'credits').setOrigin(0, 0);

        this.enemy3 = this.add.image(0, 0, 'title_enemy3').setOrigin(0, 0);
        this.enemy2 = this.add.image(0, 0, 'title_enemy2').setOrigin(0, 0);
        this.enemy1 = this.add.image(0, 0, 'title_enemy1').setOrigin(0, 0);
        this.logo = this.add.image(8, 10, 'title_logo').setOrigin(0, 0);
        this.player = this.add.image(0, 0, 'title_player').setOrigin(0, 0);
        this.text = this.add.image(0, 0, 'title_text').setOrigin(0, 0);

        this.tweens.add({
            targets: [this.enemy1],
            y: this.enemy1.y + 25,
            duration: 1400,
            repeat: -1,
            yoyo: true,
            ease: 'Sinusoidal'
        });
        this.tweens.add({
            targets: [this.enemy2],
            y: this.enemy2.y - 25,
            duration: 1300,
            repeat: -1,
            yoyo: true,
            ease: 'Sinusoidal'
        });
        this.tweens.add({
            targets: [this.enemy3],
            y: this.enemy3.y + 15,
            duration: 1500,
            repeat: -1,
            yoyo: true,
            ease: 'Sinusoidal'
        });
        this.tweens.add({
            targets: [this.player],
            y: this.player.y - 20,
            duration: 1000,
            repeat: -1,
            yoyo: true,
            ease: 'Sinusoidal'
        });

    }
    update() {

        this.menu_bg.tilePositionX += 2;
        this.menu_mg.tilePositionX += 4;
        this.menu_fg.tilePositionX += 6;



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