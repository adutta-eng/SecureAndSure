import * as c from "util/encryption"

// test('testing hash generation', () => {


//     expect(c.generateHash("woow")).toStrictEqual("");
// });

// test('testing public and private key generation', () => {


//     expect(c.generateKeys("woiiiow")).toStrictEqual("");
// });

test('encoding of simple message', () => {
    let x  = c.generateKeys("woiiiow");
    let z = c.generateHash("woiiiow");
    let y = c.encryptInfo({publicKey: x.publicKey, type: "woooowID", image: "woooooooooooooooooooooooooooooooow", parsedInfo: {wow: "wow", woow: "wwwww"}})
    expect(c.decryptInfo(z, x.encrypPrivateKey, y)).toStrictEqual({image: "", type: "", parsedInfo: ""});
});