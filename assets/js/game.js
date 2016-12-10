
var WIDTH = 800;
var HEIGHT = 600;
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

    }

    var map;
    var layer;
    var cursors;
    var player;
    var animPlayer;

    var legs;
    var animLegs;

    var player2;

    var ak47;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background
        game.add.tileSprite(0, 0, 2080, 1440, 'background');

        //map
        map = game.add.tilemap('takedown');
        map.addTilesetImage('dust', 'tiles');

        layer = map.createLayer('Layer1');
        layer.resizeWorld();


        cursors = game.input.keyboard.createCursorKeys();

        player2 = new Character('terrorist', 580, 430, true);

        ak47 = new Weapon('m249', 300, 300);
    }

    function update() {

        player2.update();

        // player.body.velocity.x = 0;
        // player.body.velocity.y = 0;
        //
        // legs.body.velocity.x = 0;
        // legs.body.velocity.y = 0;
        //
        // player.body.angularVelocity = 0;
        // legs.body.angularVelocity = 0;

        if(cursors.left.isDown) {
            // player.body.angularVelocity = -150;
            // legs.body.angularVelocity = -150;
        }
        else if(cursors.right.isDown) {
            // player.body.angularVelocity = 150;
            // legs.body.angularVelocity = 150;
        }

        if(cursors.up.isDown) {

        }

    }

    function render() {

    }

}
