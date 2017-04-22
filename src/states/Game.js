/* globals __DEV__ */
import Planet from '../sprites/Planet';
import Phaser from 'phaser';
import Satellite from '../sprites/Satellite';
import { createNewSatellites } from '../managers/SattelitesManager';

export default class extends Phaser.State {
    init () {
        this.satellites = [];
    }
    preload () {}

    create () {
        this.planet = new Planet({
            game: this,
            x: this.world.width - 150,
            y: this.world.centerY
        });
        this.game.add.existing(this.planet);
    }

    render () {
        this.satellites =
            this.satellites.concat(createNewSatellites(this, 100));
  }
}