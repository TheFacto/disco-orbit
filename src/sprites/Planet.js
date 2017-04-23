import Phaser from 'phaser';

const SPRITE = 'planet_01';
export default class extends Phaser.Sprite {
    constructor ({game, x, y}) {
        super(game, x, y, SPRITE);
        this.anchor.setTo(0.5);

        // Configure animations
        this.animations.add('health_okay', [0]);
        this.animations.add('health_warning', [1]);
        this.animations.add('health_severe', [2]);

        this.animations.play('health_okay', 1, false);

        this.health = 3;
    }

    updateHealth(health) {
        this.health = health;
        switch(health) {
            case 3:
                this.animations.play('health_okay');
                break;
            case 2:
                this.animations.play('health_warning');
                break;
            case 1:
                this.animations.play('health_severe');
                break;
            case 0:
                this.animations.play('health_severe');
                break;
        }
    }
}
