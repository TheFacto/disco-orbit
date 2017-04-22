import Satellite from '../sprites/Satellite';
import { getRandomInt } from '../utils';
import Phaser from 'phaser';

export const createNewSatellites = ({ state, beats, currentTick, distanceToThreshold }) => {
    const beatErrorMargin = 0.01;
    const speed = 100;
    const startTick = currentTick + (distanceToThreshold / speed);
    const matchingBeats =
          beats.filter((beat) => beat > (startTick - beatErrorMargin) && beat < (startTick + beatErrorMargin));
    const satellites =
          matchingBeats.map(
              (beat) => new Satellite({
                  game: state,
                  x: 0,
                  y: getRandomInt(0, 200),
                  asset: 'mushroom',
                  speed: speed
              })
          );

    satellites.forEach((satellite) => state.game.add.existing(satellite));
    return satellites;
};

const calculateSatX = (beat, speed) =>
    

const createSatellites = (game, beats, thresholdX, speed) =>
    beats.map(
        (beat) => new Satellite({
            game: game,
            x: calculateSatX(thresholdX, beat, speed),
            y: getRandomInt(0, 200),
            asset: 'mushroom',
            speed: 0
        })
    );

const createSatelliteGroup = (game, beats, thresholdX, speed) => {
    const group = new Phaser.Group();
    createSatellites(game, beats, thresholdX, speed)
        .forEach((s) => group.addChild(s));
    return group;
}
