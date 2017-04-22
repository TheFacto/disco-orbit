import Satellite from '../sprites/Satellite';
import { getRandomInt } from '../utils';

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
