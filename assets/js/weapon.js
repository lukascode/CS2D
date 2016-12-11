
function Weapon(key, x, y) {
    this.key = key;

    this.sprite = game.add.sprite(x, y, key);
    this.sprite.anchor.setTo(0.5, 0.5);

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

    function playShootSound() {
        switch(key) {
            case 'ak47':   if(!ak47_shoot.isPlaying)   ak47_shoot.play();   break;
            case 'm249':   if(!m249_shoot.isPlaying)  m249_shoot.play();   break;
            case 'xm1014': if(!deagle_shoot.isPlaying) deagle_shoot.play(); break;
            case 'knife':  if(!knife_shoot.isPlaying)  knife_shoot.play();  break;
        }
    }

    this.bullets = 30;

    this.reload = function() {
        //sound
        this.bullets = 30;
    }

    this.shoot = function() {
        //if(this.bullets > 0) {
            //sound
            playShootSound();
            this.bullets -= 1;
        //}
    }
}
