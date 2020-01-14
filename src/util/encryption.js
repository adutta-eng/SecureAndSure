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
    let keypair = rsa.generateKeyPair(1024);
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
    let encryptedImage = largeEncrypt(information.image, key)
    let encryptedParsedInfo = largeEncrypt(parsedInfo, key)

    return {
        type: key.encrypt(information.type),
        image: encryptedImage,
        parsedInfo: encryptedParsedInfo
    }
}

export function largeEncrypt(text, key) {
    const chunkSize = 106
    let pointer = 0
    let notFinished = true
    let encryptedInfo = ""

    while (notFinished) {
        let chunk = text.substring(pointer, pointer + chunkSize) 
        if (chunk.length % chunkSize != 0) {
            notFinished = false
            chunk += (chunkSize - chunk.length) * " "
        }
        encryptedInfo += key.encrypt(chunk)
        pointer += chunkSize
    }
    
    return encryptedInfo;
}

export function largeDecrypt(text, key) {
    const chunkSize = 128
    let pointer = 0
    let decryptedInfo = ""

    while (pointer < text.length) {
        let chunk = text.substring(pointer, pointer + chunkSize)
        decryptedInfo += key.decrypt(chunk)
        pointer += chunkSize
    }

    return decryptedInfo
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
    let textOfParsedInfo = JSON.parse(largeDecrypt(information.parsedInfo, privateKey).slice(0, -1))
    let decryptedImage = largeDecrypt(information.image, privateKey).slice(0, -1)

    return {
        type: privateKey.decrypt(information.type), 
        image: decryptedImage,
        parsedInfo: textOfParsedInfo
    }
}
