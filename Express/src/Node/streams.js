const fs= require('fs');

const readStream= fs.createReadStream('./docs/hugeFile.txt',{encoding:'utf-8'});
const writeStream= fs.createWriteStream('./docs/newHugeFile.txt');

// readStream.on('data',(buffer)=>{
//     writeStream.write('\nNew Chunk\n');
//     writeStream.write(buffer);
// })

readStream.pipe(writeStream);