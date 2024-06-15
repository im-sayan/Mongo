const ffmpeg = require('fluent-ffmpeg');

async function convertMP4toM3U8(inputFile, outputFile) {
  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputFile)
        .output(outputFile)
        .format('hls')
        .outputOptions([
          '-hls_time 10',    // Set segment duration to 10 seconds
          '-hls_list_size 0', // Set the number of playlist entries. 0 means the list will grow indefinitely.
          '-hls_segment_filename output_%03d.ts' // Set the filename pattern for segments
        ])
        .on('end', () => resolve())
        .on('error', err => reject(err))
        .run();
    });
    console.log('Conversion finished');
  } catch (err) {
    console.error('Error during conversion: ', err);
  }
}

const inputFile = 'file_mp4 480p.mp4';
const outputFile = 'file_mp4 480p.m3u8';

convertMP4toM3U8(inputFile, outputFile);
