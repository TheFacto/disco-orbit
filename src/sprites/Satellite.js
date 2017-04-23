import Phaser from 'phaser';

const randomOrbitOffset = () => Math.floor(Math.random() * 20) + 5;

export default class Satellite extends Phaser.Sprite {

    constructor ({ game, x, y, asset, speed }) {
        super(game, x, y, asset);
        // this.scale.setTo(0.5, 0.5);
        this.anchor.setTo(0.5);
        this.isOrbiting = false;
    }

    enterOrbit(orbitAround) {
        this.isOrbiting = true;
        this.pivot.x = (orbitAround.width + randomOrbitOffset());

        // Hook to the position
        this.position.x = orbitAround.position.x;
        this.position.y = orbitAround.position.y;
    }

    update() {
        if(this.isOrbiting) {
            this.rotation += 0.01;
        }
    }
}
