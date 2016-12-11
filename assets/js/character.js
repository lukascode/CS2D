//DEFAULT VARIABLES
var defaultLife = 100;

var defaultVelocity = 110;
var defaultLegsAnimationSpeed = 15;
var defaultVelocityRun = 200;
var defaultLegsAnimationSpeedRun = 20;

var defaultReloadAnimationSpeed = 0;
var defaultWeaponPivotValueM249 = { x: 5, y: 15 };
var defaultWeaponPivotValueAK47 = { x: 3, y: 12 };
var defaultWeaponPivotValueXM1014 = { x: 0, y: 21 };
var defaultWeaponPivotValueKNIFE = { x: 0, y: 10 };

function Character(key, x, y, cameraFollow, controller) {

    //legs and legs's animation
    this.legs = game.add.sprite(x, y, 'legs', 0);
    game.physics.enable(this.legs);
    this.legs.anchor.setTo(0.5, 0.35); //takie ust spowoduje ladne dopasowanie nog do postaci
    this.legsAnimation = this.legs.animations.add('legsAnimation', [0, 1, 2, 3, 4, 5, 6, 7]);

    //main character's sprite
    this.sprite = game.add.sprite(x, y, key, 1);
    game.physics.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;

    if(cameraFollow) {
        game.camera.follow(this.sprite);
    }

    //velocities
    this.velocity = defaultVelocity;
    this.legsAnimationSpeed = defaultLegsAnimationSpeed;

    this.runModeOn = function() {
        this.velocity = defaultVelocityRun;
        this.legsAnimationSpeed = defaultLegsAnimationSpeedRun;
    }
    this.runModeOff = function() {
        this.velocity = defaultVelocity;
        this.legsAnimationSpeed = defaultLegsAnimationSpeedRun;
    }

    //reload animation
    this.spriteReloadAnimation = this.sprite.animations.add('reloadAnimation', [0, 1, 2, 3, 4, 5]);

    var life = defaultLife;
    this.getLife = function() { return life; }
    this.takeLife = function(value) { life -= value; }

    //weapons
    this.weapons = [ new Weapon('knife', x, y), new Weapon('xm1014', x, y), new Weapon('ak47', x, y), new Weapon('m249', x, y) ];
    for(var i=1; i<this.weapons.length; ++i) { this.weapons[i].invisible(); }
    this.currentWeapon = 0;

    this.switchWeapon = function() {
        this.weapons[this.currentWeapon].invisible();
        if(this.currentWeapon < this.weapons.length-1) {
            ++this.currentWeapon;
        }
        else {
            this.currentWeapon = 0;
        }
        this.weapons[this.currentWeapon].setPosition(this.sprite.x, this.sprite.y);
        this.weapons[this.currentWeapon].visible();
    }
    this.switchWeaponFlag = false;

    this.reload = function() {
        this.spriteReloadAnimation.play(defaultReloadAnimationSpeed, false);
        this.weapons[this.currentWeapon].reload();
    }

    //audio
    var dirt1 = game.add.audio('dirt1');

    this.playWalkSound = function() {
        if(!dirt1.isPlaying)
            dirt1.restart();
    }


    this.goUp = function() {
        this.sprite.body.velocity.y = -this.velocity;
        this.legs.body.velocity.y = -this.velocity;
        this.playWalkSound();
    }
    this.goDown = function() {
        this.sprite.body.velocity.y = this.velocity;
        this.legs.body.velocity.y = this.velocity;
        this.playWalkSound();
    }
    this.goLeft = function() {
        this.sprite.body.velocity.x = -this.velocity;
        this.legs.body.velocity.x = -this.velocity;
        this.playWalkSound();
    }
    this.goRight = function() {
        this.sprite.body.velocity.x = this.velocity;
        this.legs.body.velocity.x = this.velocity;
        this.playWalkSound();
    }
    this.goForward = function() {
        this.sprite.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.sprite.angle-90, this.velocity));
        if(!this.legsAnimation.isPlaying) {
            this.legsAnimation.play(this.legsAnimationSpeed, true);
        }
        this.playWalkSound();
    }

    this.updateBody = function() {
        this.updateLegs();
        this.updateWeapon();
        this.changeSpriteFrameDependsOnWeapon();
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
    this.updateWeapon = function() {
        this.weapons[this.currentWeapon].setRotation(this.sprite.rotation);
        this.weapons[this.currentWeapon].setPosition(this.sprite.x, this.sprite.y);
        switch(this.weapons[this.currentWeapon].key) {
            case 'ak47':
                this.weapons[this.currentWeapon].setPivot(defaultWeaponPivotValueAK47.x, defaultWeaponPivotValueAK47.y);
            break;
            case 'm249':
                this.weapons[this.currentWeapon].setPivot(defaultWeaponPivotValueM249.x, defaultWeaponPivotValueM249.y);
            break;
            case 'xm1014':
                this.weapons[this.currentWeapon].setPivot(defaultWeaponPivotValueXM1014.x, defaultWeaponPivotValueXM1014.y);
            break;
            case 'knife':
                this.weapons[this.currentWeapon].setPivot(defaultWeaponPivotValueKNIFE.x, defaultWeaponPivotValueKNIFE.y);
            break;
        }
    }

    this.changeSpriteFrameDependsOnWeapon = function() {
        if(this.weapons[this.currentWeapon].key != 'xm1014') {
            this.sprite.frame = 1;
        } else {
            this.sprite.frame = 3;
        }
    }


    this.update = controller.bind(this);

};
