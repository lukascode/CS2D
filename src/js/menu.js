var intro;
var text;
var optionCount = 1;

var Menu = {


    preload: function() {
        // Load all the needed resources for the menu.
        game.load.image('menu-bg', "assets/cs2d-resources/gfx/cs2.jpg");
        game.load.audio('audio', 'assets/cs2d-resources/sfx/menu/csIntro.mp3');
    },

    create: function() {
        var bg = game.add.sprite(0, 0, 'menu-bg'),
            intro = game.add.audio('audio');
        intro.loopFull(0.2);

        text = game.add.text(game.world.centerX - 70, 100);

        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.anchor.set(0.5); // titleStyle uses the font property, which will set our font to TheMinion

        menuOption('Start', function(target) {
            intro.stop();
            Menu.startGame();
        });
        visibleCursor();
        /*
        menuOption('Options', function(target) {
            loadOptions();
        });
        menuOption('Credits', function(target) {
            console.log('You clicked Credits!');
        });
        */
    },

    startGame: function() {
        // Change the state to the actual game.
        this.state.start('Game');
    }
};

function menuOption(text, callback) {
    var optionStyle = {
        font: '40pt TheMinion',
        fill: 'white',
        align: 'left',
        stroke: 'rgba(0,0,0,0)',
        srokeThickness: 4
    };
    var txt = game.add.text(30, (this.optionCount * 80) + 150, text, optionStyle);
    var onOver = function(target) {
        target.fill = "#FEFFD5";
        target.stroke = "rgba(200,200,200,0.5)";
    };
    var onOut = function(target) {
        target.fill = "white";
        target.stroke = "rgba(0,0,0,0)";
    };
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback);
    txt.events.onInputOver.add(onOver);
    txt.events.onInputOut.add(onOut);
    optionCount++;
}

function loadOptions() {
    this.game.state.start('Option');
}

function visibleCursor() {
    $("body").css("cursor", "auto");
}
