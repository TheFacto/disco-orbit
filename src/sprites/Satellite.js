import Phaser from 'phaser';

export default class Satellite extends Phaser.Sprite {

    constructor ({ game, x, y, asset, speed }) {
        super(game, x, y, asset);
        this.speed = speed;
        this.scale.setTo(0.5, 0.5);
    }

    update() {
        if (!this.lastUpdateTime) {
            this.lastUpdateTime = this.game.time.totalElapsedSeconds();
            return;
        }

        const timeDelta = this.game.time.totalElapsedSeconds() - this.lastUpdateTime;
        this.position.x += this.speed * timeDelta;
        this.lastUpdateTime = this.game.time.totalElapsedSeconds();
    }
}
