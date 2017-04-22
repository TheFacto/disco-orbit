import Phaser from 'phaser';

export default class Satellite extends Phaser.Sprite {

    constructor ({ game, x, y, asset, speed }) {
        super(game, x, y, asset);
        this.speed = speed;
        this.scale.setTo(0.5, 0.5);
        //this.scale.setTo(1,)
    }

    update() {
    }
}
