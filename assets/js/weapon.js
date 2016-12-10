
function Weapon(key, x, y) {
    this.key = key;

    this.sprite = game.add.image(x, y, key);

    this.bullets = 30;

    this.reload = function() {
        //sound
        this.bullets = 30;
    }

    this.shoot = function() {
        if(this.bullets > 0) {
            //sound

            this.bullets -= 1;
        }
    }
}
