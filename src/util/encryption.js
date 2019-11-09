//function that generates keys takes in (security questions) and password 
//first hash the password then encrypt
//- aes encryption with keys, return struct of encrypPrivateKey and publicKey;
// use let or const instead of things like int 
var forge = require('node-forge')

/** @param password
 * @return struct (publicKey: PEM, privateKey: PEM)
 */
export function generateKeys(password) {
    let HashOfPassword = generateHash(password)
    let rsa = forge.pki.rsa
    let keypair = rsa.generateKeyPair(512);
    return {publicKey: forge.pki.publicKeyToPem(keypair.publicKey), privateKey: forge.pki.privateKeyToPem(keypair.privateKey)} 
}

//encrypt with public key (publicKey, string "type", string "image", struct "parsedInfo" ) -> returns the encrypted strings as struct with keys type, image and parsedInfo
//first line should be JSON.stringify(parsedInfo) so that my output


//function to hashThePassword
export function generateHash(password) {
    var md = forge.md.sha256.create()
    md.update(password)
    return md.digest().toHex()
}

//decrypt with (HashOfPassword, encryptPrivateKey)

//decrypt with (struct, actualPrivateKey) - > return same Struct but parsedInfo is struct from (JSON.parse(parsedInfoString))

