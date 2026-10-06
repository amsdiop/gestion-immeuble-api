// Créer une image PNG 50x50 valide
const zlib = require('zlib');
const { Buffer } = require('buffer');

// PNG header (89 50 4E 47 0D 0A 1A 0A)
const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

// IHDR chunk (50x50, 8-bit RGB)
const ihdr = Buffer.alloc(25);
ihdr.writeUInt32BE(13, 0);  // chunk length
ihdr.write('IHDR', 4);
ihdr.writeUInt32BE(50, 8);  // width
ihdr.writeUInt32BE(50, 12); // height
ihdr.writeUInt8(8, 16);     // bit depth
ihdr.writeUInt8(2, 17);     // color type (RGB)
ihdr.writeUInt8(0, 18);     // compression
ihdr.writeUInt8(0, 19);     // filter
ihdr.writeUInt8(0, 20);     // interlace

// Calcul CRC pour IHDR (simplifié - utilisons une fausse valeur pour demo)
ihdr.writeUInt32BE(0x90773546, 21);

// Créer une image simple bleue 50x50
const imageData = Buffer.alloc(50 * 50 * 3 + 50); // RGB pixels + filter byte par ligne
let offset = 0;
for (let y = 0; y < 50; y++) {
  imageData[offset] = 0; // filter type
  offset++;
  for (let x = 0; x < 50; x++) {
    imageData[offset++] = 102; // R
    imageData[offset++] = 126; // G
    imageData[offset++] = 234; // B
  }
}

// Compresser les données
const compressed = zlib.deflateSync(imageData);

// IDAT chunk
const idatChunk = Buffer.alloc(12 + compressed.length);
idatChunk.writeUInt32BE(compressed.length, 0);
idatChunk.write('IDAT', 4);
compressed.copy(idatChunk, 8);
idatChunk.writeUInt32BE(0x00000000, 8 + compressed.length); // CRC (fake)

// IEND chunk
const iendChunk = Buffer.from([
  0, 0, 0, 0,       // length
  73, 69, 78, 68,   // "IEND"
  174, 66, 96, 130  // CRC
]);

// Combiner tous les chunks
const png = Buffer.concat([pngHeader, ihdr, idatChunk, iendChunk]);

require('fs').writeFileSync('test-blue.png', png);
console.log('Image PNG créée:', png.length, 'bytes');
