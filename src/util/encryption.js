import { Input } from '@material-ui/core';

let forge = require('node-forge')

export function xorEncryption(key, message) {
    let encryptedMessage = ""
    
    for (var i = 0; i < message.length; i++) {
        encryptedMessage += String.fromCharCode(message[i].charCodeAt(0) ^ key[i % key.length].charCodeAt(0))
    }

    return encryptedMessage
}

//function that generates keys takes in (security questions) and password 
// first hash the password then encrypt
//- aes encryption with keys, return struct of encrypPrivateKey and publicKey;
// use let or const instead of things like int 
export function generateKeys(password) {
    let HashOfPassword = generateHash(password)
    let rsa = forge.pki.rsa
    let keypair = rsa.generateKeyPair(2048);
    let PrivateKey = forge.pki.privateKeyToPem(keypair.privateKey)
    let encrypPrivateKey =  xorEncryption(HashOfPassword, PrivateKey)

    return {
        publicKey: forge.pki.publicKeyToPem(keypair.publicKey), 
        encryptedPrivateKey: encrypPrivateKey
    } 
}

//encrypt with public key (publicKey, string "type", string "image", struct "parsedInfo" ) 
//-> returns the encrypted strings as struct with keys type, image and parsedInfo
//first line should be JSON.stringify(parsedInfo) so that my output
//JSON.parse(parsedInfo)
export function encryptInfo(information) {
    let parsedInfo = JSON.stringify(information.parsedInfo)    
    let key = forge.pki.publicKeyFromPem(information.publicKey)

    return {
        type: key.encrypt(information.type),
        image: key.encrypt(information.image),
        parsedInfo: key.encrypt(parsedInfo)
    }
}

//function to hashThePassword
export function generateHash(password) {
    var md = forge.md.sha256.create()
    md.update(password)
    return md.digest().toHex()
}

//decrypt with (HashOfPassword, encryptPrivateKey)
export function decryptInfo(HashOfPassword, encrypPrivateKey, information) {
    let privateKey = forge.pki.privateKeyFromPem(xorEncryption(HashOfPassword, encrypPrivateKey))
    let textOfParsedInfo = JSON.parse(privateKey.decrypt(information.parsedInfo))

    return {
        type: privateKey.decrypt(information.type), 
        image: privateKey.decrypt(information.image), 
        parsedInfo: textOfParsedInfo
    }
}
