
var WIDTH = 500;
var HEIGHT = 300;

window.onload = function() {
    var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '',
    { preload: preload, create: create, update: update });

    function preload() {
        console.log('preload');
    }

    function create() {
        console.log('create');
    }

    function update() {
        
    }
}
