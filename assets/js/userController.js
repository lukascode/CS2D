var userController = function() {
        this.sprite.body.velocity.setTo(0, 0);
        this.legs.body.velocity.setTo(0, 0);

        this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite) + Math.PI/2;
        this.updateBody();

        if(game.input.keyboard.isDown(Phaser.Keyboard.W)) { this.goForward(); }
        else { this.legsAnimation.loop = false; }

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
            if(!this.switchWeaponFlag) {
                this.switchWeapon();
                this.switchWeaponFlag= true;
            }
        } else this.switchWeaponFlag = false;
        if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            this.reload();
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) { this.runModeOn(); }
        else { this.runModeOff(); }
        if(game.input.mousePointer.isDown) {
                this.weapons[this.currentWeapon].shoot();
        }
}
