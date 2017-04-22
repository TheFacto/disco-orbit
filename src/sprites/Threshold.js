import Phaser from 'phaser';

/**
 * Threshold class. Represents the visual queue
 * for the player to know when to input.
 * @class Threshold
 */
class Threshold extends Phaser.Sprite {
    constructor ({game, x, y, asset}) {
        super(game, x, y, asset);
        this.anchor.setTo(0.5);
        this.scale.setTo(game.world.width, 1);
    }
}

export default Threshold;
