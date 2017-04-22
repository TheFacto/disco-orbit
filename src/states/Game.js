/* globals __DEV__ */
import Planet from '../sprites/Planet';
import Phaser from 'phaser';
import Threshold from '../sprites/Threshold';
import { createSatelliteGroup } from '../managers/SattelitesManager';
import orbitalSong from '../songs/orbital';

export default class extends Phaser.State {
    init () {
        this.beats = orbitalSong.ticks;
        this.thresholdDistance = this.world.width - 300;
        this.satelliteSpeed = 200;
    }

    preload () {
        this.load.audio(orbitalSong.id, [`assets/music/${orbitalSong.asset}`]);
    }

    create () {
        this.debugText = this.game.add.text(this.world.centerX, this.world.centerY, "test");
        this.planet = new Planet({
            game: this,
            x: this.world.width - 150,
            y: this.world.centerY
        });
        this.threshold = new Threshold({
            game: this,
            x: this.thresholdDistance,  // TODO: Calculate actual placement
            y: this.world.centerY,
            asset: 'threshold'
        });

        this.music = this.add.audio(orbitalSong.id);
        this.musicStartTime = this.game.time.totalElapsedSeconds();
        this.music.play();
        this.game.add.existing(this.planet);
        this.game.add.existing(this.threshold);

        const secondsPerBeat = (60 / orbitalSong.bpm) * 1000;
        this.beatCount = 0;
        /*this.time.events.loop(secondsPerBeat, () => {
            console.log(`Beat: ${this.beatCount}`);
            // Give 4 beats buffer
            if(this.beatCount === 4) {
                this.musicStartTime = this.game.time.totalElapsedSeconds();
                this.music.play();
            }
            this.beatCount++;
        }, this); */

        // Satellite Group
        this.satelliteGroup = createSatelliteGroup(this, this.beats, this.thresholdDistance, this.satelliteSpeed);
        this.satelliteGroup.position.x = -45;
        this.game.add.existing(this.satelliteGroup);

        // Orbit Group
        this.orbitGroup = new Phaser.Group(this.game);
        this.game.add.existing(this.orbitGroup);

        this.lastFrameTime = this.game.time.totalElapsedSeconds();

        // set-up the physics bodies
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(this.threshold);
        this.game.physics.arcade.enable(this.satelliteGroup);

        // add physics to group
        this.satelliteGroup.enableBody = true;
        this.satelliteGroup.enableBodyDebug = true;
        this.satelliteGroup.physicsBodyType = Phaser.Physics.Arcade;
    }

    render() {
        //this.game.debug.body(this.threshold);
        //this.satelliteGroup.forEach((a) => {
        //    this.game.debug.body(a)
        //});
    }

    update () {
        // Update satellite group
        this.debugText.setText(this.getTick());
        const delta = this.game.time.totalElapsedSeconds() - this.lastFrameTime;
        this.satelliteGroup.position.x += this.satelliteSpeed * delta;

        this.lastFrameTime = this.game.time.totalElapsedSeconds();

        if (this.game.physics.arcade.collide(this.threshold, this.satelliteGroup, this.collisionHandler, this.processHandler, this)) {

        }
    }

    processHandler(threshold, satellite) {
        return true;
    }

    collisionHandler(threshold, satellite) {
        if (this.hitcount == undefined) {
            this.hitcount = 0;
        } else {
            this.hitcount++;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            console.log("spacebar pressed while in threshold zone");

            // Update orbit
            const orbitGroup = this.orbitGroup;
            const planet = this.planet;
            const satGroup = this.satelliteGroup;
            const toRemove = [];
            toRemove.push(satellite);

            toRemove.forEach((satellite) => {
                satGroup.remove(satellite);
                satellite.enterOrbit(planet);
                orbitGroup.add(satellite);
            });
        }

        //console.log("hitcount: " + this.hitcount);
    }

    getTick() {
        return this.game.time.totalElapsedSeconds() - this.musicStartTime;
    }
}
