import * as c from "util/encryption"

test('WOOOORk', () => {


    expect(c.generateHash("woow")).toStrictEqual({hi: "wow", stop: {bye: "wtvr"} });
});

test('testing public and private key generation', () => {


    expect(c.generateKeys("woiiiow")).toStrictEqual({hi: "wow", stop: {bye: "wtvr"} });
});