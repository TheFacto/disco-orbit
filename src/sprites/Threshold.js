'use strict';

import Phaser from 'phaser';
const SPRITE = 'threshold_sprite';

/**
 * Threshold class. Represents the visual queue
 * for the player to know when to input.
 * @class Threshold
 */
class Threshold extends Phaser.Sprite {
    constructor ({game, x, y}) {
        super(game, x, y, SPRITE);
        this.anchor.setTo(0.5);
        this.scale.setTo(game.world.width, 1);

        // Configure animations
        this.animations.add('inactive', [0]);
        this.animations.add('pressed', [1]);
        this.animations.play('inactive', 1, false);
    }
}

export default Threshold;
