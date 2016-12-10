//DEFAULT VARIABLES
var defaultLife = 100;
var defaultVelocity = 150;
var defaultLegsAnimationSpeed = 10;

function Character(key, x, y, cameraFollow) {

    //legs and legs's animation
    this.legs = game.add.sprite(x, y, 'legs', 0);
    game.physics.enable(this.legs);
    this.legs.anchor.setTo(0.5, 0.35); //takie ust spowoduje ladne dopasowanie nog do postaci
    this.legsAnimation = this.legs.animations.add('legsAnimation', [0, 1, 2, 3, 4, 5, 6, 7]);

    //main character's sprite
    this.sprite = game.add.sprite(x, y, key, 1);
    game.physics.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);

    if(cameraFollow) {
        game.camera.follow(this.sprite);
    }

    var life = defaultLife;
    this.getLife = function() { return life; }
    this.takeLife = function(value) { life -= value; }

    //this.weapon =

    this.reload = function() {

    }


    this.goUp = function() {
        this.sprite.body.velocity.y = -defaultVelocity;
        this.legs.body.velocity.y = -defaultVelocity;
    }
    this.goDown = function() {
        this.sprite.body.velocity.y = defaultVelocity;
        this.legs.body.velocity.y = defaultVelocity;
    }
    this.goLeft = function() {
        this.sprite.body.velocity.x = -defaultVelocity;
        this.legs.body.velocity.x = -defaultVelocity;
    }
    this.goRight = function() {
        this.sprite.body.velocity.x = defaultVelocity;
        this.legs.body.velocity.x = defaultVelocity;
    }

    this.kill = function() {

    }

    this.setPosition = function(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
        this.updateLegs();
    }
    this.getPosition = function() {
        var x = this.sprite.x;
        var y = this.sprite.y;
        return new Phaser.Point(x, y);
    }

    this.updateLegs = function() {
        this.legs.rotation = this.sprite.rotation;
        this.legs.x = this.sprite.x;
        this.legs.y = this.sprite.y;
    }

    this.update = function() {
        this.sprite.body.velocity.setTo(0, 0);
        this.legs.body.velocity.setTo(0, 0);

        this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);
        this.updateLegs();

        if(game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            this.sprite.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.sprite.angle-90, defaultVelocity));


            if(!this.legsAnimation.isPlaying) {
                this.legsAnimation.play(defaultLegsAnimationSpeed, true);
            }
        } else {
            this.legsAnimation.loop = false;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            this.goDown();
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.goLeft();
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.goRight();
        }


    }

};
