import Phaser from 'phaser';

export default class Satellite extends Phaser.Sprite {

    constructor ({ game, x, y, asset, speed }) {
        super(game, x, y, asset);
        this.speed = speed;
    }

    update() {
        this.position.x += this.speed;
    }
}
