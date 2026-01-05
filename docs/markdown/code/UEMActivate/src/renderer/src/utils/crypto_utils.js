import CryptoJS from 'crypto-js'

const secret_key = 'nmdlyx1234567890'

//Encrypt-加密
export function encryptStr(str) {
  let ciphertext = CryptoJS.AES.encrypt(str, secret_key).toString();
  console.log("encryptStr", ciphertext)
  return ciphertext;
}

//Decrypt-解密
export function decryptStr(ciphertext) {
  let bytes = CryptoJS.AES.decrypt(ciphertext, secret_key);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log("decryptStr", originalText);
  return originalText;
}

//解密
export function decryptStrEcb(word) {
  var key = CryptoJS.enc.Utf8.parse('nmdlyx1234567890');
  var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}


// console.log(encryptStr("hello 1212"))
// console.log(decryptStr("U2FsdGVkX1+FOxRKoFPi93rZ6riuOmrnnx21zid8cmk="))
