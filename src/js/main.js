var game;
var WIDTH = 1024;
var HEIGHT = 576;
// Create a new game instance 600px wide and 450px tall:
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '');

// First parameter is how our state will be called.
// Second parameter is an object containing the needed methods for state functionality
game.state.add('Menu', Menu);

game.state.add('Game', Game);
//game.state.add('Option', Option);

game.state.start('Menu');
