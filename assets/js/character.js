//DEFAULT VARIABLES
var defaultLife = 100;
var defaultVelocity = 110;
var defaultLegsAnimationSpeed = 15;
var defaultWeaponPivotValueM249 = { x: 5, y: 15 };
var defaultWeaponPivotValueAK47 = { x: 3, y: 12 };
var defaultWeaponPivotValueXM1014 = { x: 0, y: 21 };
var defaultWeaponPivotValueKNIFE = { x: 0, y: 10 };

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

    //weapons
    this.weapons = [ new Weapon('knife', x, y), new Weapon('xm1014', x, y), new Weapon('ak47', x, y), new Weapon('m249', x, y) ];
    for(var i=1; i<this.weapons.length; ++i) { this.weapons[i].invisible(); }
    var currentWeapon = 0;

    this.switchWeapon = function() {
        this.weapons[currentWeapon].invisible();
        if(currentWeapon < this.weapons.length-1) {
            ++currentWeapon;
        }
        else {
            currentWeapon = 0;
        }
        this.weapons[currentWeapon].setPosition(this.sprite.x, this.sprite.y);
        this.weapons[currentWeapon].visible();
    }
    var switchWeaponFlag = false;

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
    this.updateWeapon = function() {
        this.weapons[currentWeapon].setRotation(this.sprite.rotation);
        this.weapons[currentWeapon].setPosition(this.sprite.x, this.sprite.y);
        switch(this.weapons[currentWeapon].key) {
            case 'ak47':
                this.weapons[currentWeapon].setPivot(defaultWeaponPivotValueAK47.x, defaultWeaponPivotValueAK47.y);
            break;
            case 'm249':
                this.weapons[currentWeapon].setPivot(defaultWeaponPivotValueM249.x, defaultWeaponPivotValueM249.y);
            break;
            case 'xm1014':
                this.weapons[currentWeapon].setPivot(defaultWeaponPivotValueXM1014.x, defaultWeaponPivotValueXM1014.y);
            break;
            case 'knife':
                this.weapons[currentWeapon].setPivot(defaultWeaponPivotValueKNIFE.x, defaultWeaponPivotValueKNIFE.y);
            break;
        }
    }

    this.changeSpriteFrameDependsOnWeapon = function() {
        if(this.weapons[currentWeapon].key != 'xm1014') {
            this.sprite.frame = 1;
        } else {
            this.sprite.frame = 3;
        }
    }

    this.update = function() {
        this.sprite.body.velocity.setTo(0, 0);
        this.legs.body.velocity.setTo(0, 0);

        this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite) + Math.PI/2;
        this.updateLegs();
        this.updateWeapon();
        this.changeSpriteFrameDependsOnWeapon();

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
        if(game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            if(!switchWeaponFlag) {
                this.switchWeapon();
                switchWeaponFlag= true;
            }
        } else switchWeaponFlag = false;
        if(game.input.mousePointer.isDown) {
            this.weapons[currentWeapon].shoot();
        }


    }

};
