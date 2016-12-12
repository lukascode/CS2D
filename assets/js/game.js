
var WIDTH = 1024;
var HEIGHT = 576;
var game;
window.onload = function() {
    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

    function preload() {

        game.stage.backgroundColor = '#000';

        //tiled map
        game.load.tilemap('takedown', 'assets/cs2d-resources/maps/takedown.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/cs2d-resources/gfx/Tiles/dust.bmp');


        //characters
        game.load.spritesheet('police', 'assets/cs2d-resources/gfx/player/ct3.png', 32, 32, 6);
        game.load.spritesheet('terrorist', 'assets/cs2d-resources/gfx/player/t4.png', 32, 32, 6);

        //legs
        game.load.spritesheet('legs', 'assets/cs2d-resources/gfx/player/legs-t.png', 32, 32, 8);

        //background
        game.load.image('background', 'assets/cs2d-resources/gfx/backgrounds/stone1.jpg');

        //weapons
        game.load.image('ak47', 'assets/cs2d-resources/gfx/weapons2/ak47.png');
        game.load.image('m249', 'assets/cs2d-resources/gfx/weapons2/m249.png');
        game.load.image('xm1014', 'assets/cs2d-resources/gfx/weapons2/xm1014.png');
        game.load.image('knife', 'assets/cs2d-resources/gfx/weapons2/knife.png');
        game.load.image('bullet', 'assets/cs2d-resources/gfx/weapons2/bullet3.png');

        //pointer
        game.load.spritesheet('pointer', 'assets/cs2d-resources/gfx/pointer2.png', 23, 23, 4);

        //audio
        game.load.audio('ak47_shoot', 'assets/cs2d-resources/sfx/weapons2/ak47.wav');
        game.load.audio('deagle_shoot', 'assets/cs2d-resources/sfx/weapons2/deagle.wav');
        game.load.audio('m249_shoot', 'assets/cs2d-resources/sfx/weapons2/m249.wav');
        game.load.audio('knife_shoot', 'assets/cs2d-resources/sfx/weapons2/knife_hitwall.wav');
        game.load.audio('noammo', 'assets/cs2d-resources/sfx/weapons2/empty.wav');
        game.load.audio('reload_weapon', 'assets/cs2d-resources/sfx/weapons2/reload.wav');
        game.load.audio('reload_weapon2', 'assets/cs2d-resources/sfx/weapons2/reload2.wav');

        game.load.audio('dirt1', 'assets/cs2d-resources/sfx/player2/pl_dirt1.wav');
        game.load.audio('dirt2', 'assets/cs2d-resources/sfx/player2/pl_dirt2.wav');
        game.load.audio('dirt3', 'assets/cs2d-resources/sfx/player2/pl_dirt3.wav');
        game.load.audio('dirt4', 'assets/cs2d-resources/sfx/player2/pl_dirt4.wav');

    }

    var map;
    var layer;
    var cursors;

    var player;
    var pointer;

    var bot;


    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background
        game.add.tileSprite(0, 0, 2080, 1440, 'background');

        //map
        map = game.add.tilemap('takedown');
        map.addTilesetImage('dust', 'tiles');

        layer = map.createLayer('Layer1');
        layer.resizeWorld();

        map.setCollision([2, 3, 4, 5, 6, 7, 8, 21, 22, 23, 24, 59, 60, 61, 62, 63, 64, 67, 68, 75, 76, 77]);


        cursors = game.input.keyboard.createCursorKeys();

        player = new Character('terrorist', 580, 430, true, userController);

        bot = new Character('police', 600, 350, false, AIController);



        //pointer
        pointer = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'pointer', 1);
        pointer.anchor.setTo(0.5, 0.5);
        game.physics.enable(pointer);

    }

    function update() {

        player.update();
        bot.update();
        updatePointer();

         game.physics.arcade.collide(player.sprite, layer);

        if(cursors.left.isDown) {

        }
        else if(cursors.right.isDown) {

        }

        if(cursors.up.isDown) {

        }

    }

    function updatePointer() {
        pointer.x = game.camera.x + game.input.activePointer.position.x;
        pointer.y = game.camera.y + game.input.activePointer.position.y;
    }

    function render() {

    }

}
