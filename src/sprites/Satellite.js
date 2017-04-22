import Phaser from 'phaser';

export default class Satellite extends Phaser.Sprite {

    constructor ({ game, x, y, asset, speed }) {
        super(game, x, y, asset);
        this.speed = speed;
        this.scale.setTo(0.5, 0.5);
        this.anchor.setTo(0.5);
        this.isOrbiting = false;
    }

    enterOrbit(orbitAround) {
        this.isOrbiting = true;
        this.pivot.x = (orbitAround.width + 50);

        // Hook to the position
        this.position.x = orbitAround.position.x;
        this.position.y = orbitAround.position.y;
    }

    update() {
        if (!this.lastUpdateTime) {
            this.lastUpdateTime = this.game.time.totalElapsedSeconds();
            return;
        }

        const timeDelta = this.game.time.totalElapsedSeconds() - this.lastUpdateTime;
        if (!this.isOrbiting) {
            this.position.x += this.speed * timeDelta;
        }
        this.lastUpdateTime = this.game.time.totalElapsedSeconds();

        if(this.isOrbiting) {
            this.rotation += 0.01;
        }
    }
}
