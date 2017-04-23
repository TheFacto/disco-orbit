/* globals __DEV__ */
import Planet from '../sprites/Planet';
import Phaser from 'phaser';
import Threshold from '../sprites/Threshold';
import { createSatelliteGroup } from '../managers/SattelitesManager';
import orbitalSong from '../songs/orbital';

const setupSatelliteGroup = (state) => {
    state.satelliteGroup = createSatelliteGroup(state, state.beats, state.thresholdDistance, state.satelliteSpeed);
    state.satelliteGroup.position.y = 40;

    state.game.add.existing(state.satelliteGroup);
    state.game.physics.arcade.enable(state.satelliteGroup);

    // add physics to group
    state.satelliteGroup.enableBody = true;
    state.satelliteGroup.enableBodyDebug = true;
    state.satelliteGroup.physicsBodyType = Phaser.Physics.Arcade;
};

const setupStaticGraphics = (state) => {
    state.planet = new Planet({
        game: state,
        x: state.world.centerX,
        y: 100
    });
    state.threshold = new Threshold({
        game: state,
        x: 0,
        y: state.thresholdDistance,  // TODO: Calculate actual placement
        asset: 'threshold'
    });
    state.game.add.existing(state.planet);
    state.game.add.existing(state.threshold);
};

const playMusic = (state) => {
    state.music = state.add.audio(orbitalSong.id);
    state.musicStartTime = state.game.time.totalElapsedSeconds();
    state.music.play();
};

export default class extends Phaser.State {
    init () {
        this.beats = orbitalSong.ticks;
        this.thresholdDistance = 250;
        this.satelliteSpeed = 200;
    }

    preload () {
        this.load.audio(orbitalSong.id, [`assets/music/${orbitalSong.asset}`]);
    }

    create () {
        setupStaticGraphics(this);
        setupSatelliteGroup(this);
        playMusic(this);

        // Orbit Group
        this.orbitGroup = new Phaser.Group(this.game);
        this.game.add.existing(this.orbitGroup);

        this.lastFrameTime = this.game.time.totalElapsedSeconds();

        // set-up the physics bodies
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(this.threshold);

    }

    render() {
        //this.game.debug.body(this.threshold);
        //this.satelliteGroup.forEach((a) => {
        //    this.game.debug.body(a)
        //});
    }

    update () {
        // Update satellite group
        const delta = this.game.time.totalElapsedSeconds() - this.lastFrameTime;
        this.satelliteGroup.position.y -= this.satelliteSpeed * delta;
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
