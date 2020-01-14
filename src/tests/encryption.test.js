import * as c from "util/encryption"
import expectExport from "expect";

// test('testing hash generation', () => {


//     expect(c.generateHash("woow")).toStrictEqual("");
// });

// test('testing public and private key generation', () => {


//     expect(c.generateKeys("woiiiow")).toStrictEqual("");
// });

test('encoding of simple message', () => {
    let x  = c.generateKeys("woiiiow");
    let z = c.generateHash("woiiiow");
    let y = c.encryptInfo({publicKey: x.publicKey, type: "woooowID", image: "oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!oo!I hate life and you should too!", parsedInfo: {wow: "wow", woow: "wwwww"}})
    //expect(y).toStrictEqual({image: "", type: "", parsedInfo: ""});
    //expect().toStrictEqual({image: "", type: "", parsedInfo: ""});
    console.log(c.decryptInfo(z, x.encryptedPrivateKey, y))
});