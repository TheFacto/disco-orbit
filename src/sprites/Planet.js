import Phaser from 'phaser'

export default class extends Phaser.Sprite {
    constructor({game, x, y}) {
        super(game, x, y, 'planet');

        this.anchor.setTo(0.5)
        this.height = 100;
        this.width = 100;
    }
}
