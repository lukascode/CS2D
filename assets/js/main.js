var game;

// Create a new game instance 600px wide and 450px tall:
game = new Phaser.Game(1024, 576, Phaser.AUTO, '');

// First parameter is how our state will be called.
// Second parameter is an object containing the needed methods for state functionality
game.state.add('Menu', Menu);

game.state.add('Game', Game);
//game.state.add('Option', Option);

game.state.start('Menu');
