
var WIDTH = 455;
var HEIGHT = 250;

window.onload = function() {
    var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

    function preload() {
        game.load.baseURL = 'http://examples.phaser.io/assets/';
        game.load.crossOrigin = 'anonymous';
        game.load.image('background', 'games/starstruck/background.png');
        game.load.image('platform', 'sprites/block.png');
        game.load.spritesheet('player', 'games/starstruck/dude.png', 32, 48);

    }

    var platforms;
    function create() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite(100, 0, 'background');
        game.add.sprite(200, 0, 'background');
        game.add.sprite(300, 0, 'background');
        var platform = game.add.sprite(230, HEIGHT-50, 'platform');
        platform.scale.setTo(0.5, 0.5);

        //enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //creating group
        platforms = game.add.group();

        //enable physics for any object that is created in this group
        platforms.enableBody = true;

        //creating ground
        var ground = platforms.create(0, game.world.height - 64, 'platform');
        
    }

    function update() {

    }
}
