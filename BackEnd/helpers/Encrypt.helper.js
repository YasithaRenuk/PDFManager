const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_KEY;

const encryptFile = (filePath, encryptedPath) => {
    const cipher = crypto.createCipher(algorithm, secretKey);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(encryptedPath);
  
    return new Promise((resolve, reject) => {
      input.pipe(cipher).pipe(output).on("finish", resolve).on("error", reject);
    });
  };
  
const decryptFile = (encryptedPath, decryptedPath) => {
    const decipher = crypto.createDecipher(algorithm, secretKey);
    const input = fs.createReadStream(encryptedPath);
    const output = fs.createWriteStream(decryptedPath);
  
    return new Promise((resolve, reject) => {
      input.pipe(decipher).pipe(output).on("finish", resolve).on("error", reject);
    });
};
  
module.exports = {
    encryptFile,
    decryptFile
}