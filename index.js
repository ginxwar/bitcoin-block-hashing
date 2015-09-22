/* borrowed heavily from https://en.bitcoin.it/wiki/Block_hashing_algorithm
 *
 *  Block 125552 -> http://blockexplorer.com/block/00000000000000001e8d6829a8a21adc5d38d0a473b144b6765798e61f98bd1d
 *
 * Header
 *
 Version (4 bytes)
 hashPrevBlock (32 bytes)
 hashMerkleRoot (32 bytes)
 Time (4 bytes)
 Bits (4 bytes)
 Nonce (4 bytes)

 Version          1
 hashPrevBlock    00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81
 hashMerkleRoot   2b12fcf1b09288fcaff797d71e950e71ae42b91e8bdb2304758dfcffc2b620e3
 Time             2011-05-21 17:26:31
 Bits             440711666
 Nonce            2504433986
 */

var endianToggle = require('endian-toggle');
var moment = require('moment');
var SHA256 = require("crypto-js/sha256");

var header = {
  version: 1,
  hashPrevBlock: "00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81",
  hashMerkleRoot: "2b12fcf1b09288fcaff797d71e950e71ae42b91e8bdb2304758dfcffc2b620e3",
  time: "2011-05-21 17:26:31",
  bits: 440711666,
  nonce: 2504433986
};

// header_hex = ("01000000" +
//     "81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000" +
//     "e320b6c2fffc8d750423db8b1eb942ae710e951ed797f7affc8892b0f1fc122b" +
//     "c7f5d74d" +
//     "f2b9441a" +
//      "42a14695")

// the version must be a 32-byte hex
var versionHex = ("0000000" + header.version).toString(16);

// the time must be UTC and converted to hex
var utcTime = moment.utc(header.time).unix().toString(16);

var headerEncoded = {
  version: swapEndian(versionHex, 32),
  hashPrevBlock: swapEndian(header.hashPrevBlock, 256),
  hashMerkleRoot: swapEndian(header.hashMerkleRoot, 256),
  time: swapEndian(utcTime, 32),
  bits: swapEndian(header.bits.toString(16), 32),
  nonce: swapEndian(header.nonce.toString(16), 32)
};

console.log(headerEncoded);

// the full header should be 80-bytes
var headerFull = headerEncoded.version + headerEncoded.hashPrevBlock + headerEncoded.hashMerkleRoot + headerEncoded.time + headerEncoded.bits + headerEncoded.nonce;
var headerFullBin = new Buffer(headerFull, 'hex');

console.log(headerFullBin);
// console.log(sha256x2(headerFullBin));
// sha256x2

console.log(SHA256(headerFull).toString());
console.log(SHA256(headerFullBin).toString());


function sha256x2(hexString) {
  var buffer = new Buffer(hexString, 'hex');

}


function swapEndian(hex, bits) {
  var buffer = new Buffer(hex, 'hex');
  return endianToggle(buffer, bits).toString('hex');
}
