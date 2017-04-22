import Satellite from '../sprites/Satellite';
import { getRandomInt } from '../utils';
import Phaser from 'phaser';

const createSatellites = (game, beats, thresholdX, speed) =>
    beats.map(
        (beat) => new Satellite({
            game: game,
            x: thresholdX - beat * speed,
            y: getRandomInt(0, 200),
            asset: 'mushroom',
            speed: 0
        })
    );

export const createSatelliteGroup = (game, beats, thresholdX, speed) => {
    const group = new Phaser.Group(game);
    createSatellites(game, beats, thresholdX, speed)
        .forEach((s) => group.addChild(s));
    return group;
};
