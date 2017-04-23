// Usage: node midireader.js [FILENAME]

const fs = require('fs');
const MidiFile = require('midifile');

const readFile = (filePath) => fs.readFileSync(filePath).buffer;

const retrieveTimes = (filePath) =>
      (new MidiFile(readFile(filePath)))
      .getEvents()
      .filter((event) => event.subtype == 9)
      .map((event) => event.playTime / 1000);

console.log(retrieveTimes(process.argv[2]));
