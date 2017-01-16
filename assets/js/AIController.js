var AIController = function() {

    //this.sprite.body.velocity.setTo(0, 0);
    //this.legs.body.velocity.setTo(0, 0);

    /*this.sprite.body.velocity.x = 100; //dziala  */


    if(this.weapons[this.currentWeapon].bullets <= 0) {
        this.switchWeapon();
        if(this.weapons[this.currentWeapon].bullets <= 0) {
            this.reload();
        }
    }

    if((game.physics.arcade.distanceBetween(this.sprite, characters[0].sprite) < 500) && characters[0].islive) {
        this.sprite.rotation = game.physics.arcade.angleBetween(this.sprite, characters[0].sprite) + Math.PI/2;
        if((game.physics.arcade.distanceBetween(this.sprite, characters[0].sprite) < 300)) {
            this.stopGoForward();
            this.shoot();
        } /*else this.goForward();*/

    } else this.stopGoForward();

    this.updateBody();

}
