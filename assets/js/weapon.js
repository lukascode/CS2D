//DEFAULT VARIABLES
//shoot delay
var default_ak47_delay = 200;
var default_deagle_delay = 300;
var default_m249_delay = 100;
var default_knife_delay = 300;

//bullets number
var default_ak47_bulletsNumber = 30;
var default_deagle_bulletsNumber = 10;
var default_m249_bulletsNumber = 100;


function Weapon(key, x, y) {
    this.key = key;

    this.sprite = game.add.sprite(x, y, key);
    this.sprite.anchor.setTo(0.5, 0.5);

    //bullets
    this.weapon = game.add.weapon(30, 'bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 2000;//5000;
    //weapon.fireRate = 100;
    this.weapon.trackSprite(this.sprite, 0, 0, true);
    //weapon.bulletCollideWorldBounds = true; - kolizja ze swiatem
    //weapon.bullets.enableBody = true;


    if(key == 'knife') {
        this.sprite.scale.setTo(-2, 2);
    }

    this.setPosition = function(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }
    this.setPivot = function(x, y) {
        this.sprite.pivot.x = x;
        this.sprite.pivot.y = y;
    }
    this.setRotation = function(rotation) {
        this.sprite.rotation = rotation;
    }
    this.visible = function() { this.sprite.visible = true;  }
    this.invisible = function() { this.sprite.visible = false; }

    //audio
    var ak47_shoot = game.add.audio('ak47_shoot');
    var deagle_shoot = game.add.audio('deagle_shoot');
    var m249_shoot = game.add.audio('m249_shoot');
    var knife_shoot = game.add.audio('knife_shoot');
    var noammo = game.add.audio('noammo');
    var reload_weapon = game.add.audio('reload_weapon');
    reload_weapon.onStop.add(playReloadWeapon2, this);
    var reload_weapon2 = game.add.audio('reload_weapon2');

    function playReloadWeapon2() {
        reload_weapon2.restart();
    }

    var weapon_lastTime = game.time.now;

    function playShootSound() {
        switch(key) {
            case 'ak47':   ak47_shoot.restart();   break;
            case 'm249':   m249_shoot.restart();   break;
            case 'xm1014': deagle_shoot.restart(); break;
            case 'knife':  knife_shoot.restart();  break;
        }
    }

    this.bullets = getBulletsNumber();

    this.reload = function() {
        if(this.key != 'knife') {
            if(this.bullets < getBulletsNumber()) {
                reload_weapon.restart();
                this.bullets = getBulletsNumber();
            }
        }
    }

    function getBulletsNumber() {
        switch(key) {
            case 'ak47':   return default_ak47_bulletsNumber;
            case 'm249':   return default_m249_bulletsNumber;
            case 'xm1014': return default_deagle_bulletsNumber;
            case 'knife': return 1;
        }
    }

    this.shoot = function() {
        if(isTimeElapsedForNextShoot()) {
            if(this.bullets > 0) {
                playShootSound();
                this.sprite.angle -= 90;
                if(this.key != 'knife') this.weapon.fire();
                this.sprite.angle += 90;
                if(key != 'knife') this.bullets -= 1;
            } else { noammo.restart(); }
        }
    }

    function isTimeElapsedForNextShoot() {
        var timeElapsed = game.time.now - weapon_lastTime;
        var defaultDelay;
        switch(key) {
            case 'ak47': defaultDelay = default_ak47_delay; break;
            case 'm249': defaultDelay = default_m249_delay; break;
            case 'xm1014': defaultDelay = default_deagle_delay; break;
            case 'knife': defaultDelay = default_knife_delay; break;
        }
        if(timeElapsed >= defaultDelay) {
            weapon_lastTime = game.time.now;
            return true;
        } else return false;
    }

}
