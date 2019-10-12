import base64
import zlib
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
#use the thing below in a class that takes in an image file
def create_keys():
    key = RSA.generate(4096, e =  65537)
    priv_key = key.exportKey("PEM")
    private_key = open("private_key.pem", "w+")
    private_key.write(priv_key.decode())
    private_key.close()
    pub_key = key.publickey().exportKey("PEM")
    public_key = open("public_key.pem", "w+")
    public_key.write(pub_key.decode())
    public_key.close()

class Encryption:
    """A class used for encryption"""
    def __init__(self, information):
        with open(information, "rb") as image_file:
            image_string = base64.b64encode(image_file.read())
        self.info = image_string

    def encrypt(self, public_key_file):
        public_key = RSA.importKey(open(public_key_file).read())
        cipher = PKCS1_OAEP.new(public_key)
        chunk_size = 470
        pointer = 0
        not_finished = True
        encrypted_info = []

        while (not_finished):
            chunk = self.info[pointer:pointer + chunk_size]
            if (len(chunk) % chunk_size != 0):
                not_finished = False
                chunk += ((chunk_size - len(chunk)) * " ").encode()
            encrypted_info.append(cipher.encrypt(chunk))
            pointer += chunk_size
        self.encrypted_info = b''.join(encrypted_info)

    def decrypt(self, private_key_file):
        private_key = RSA.importKey(open(private_key_file).read())
        cipher = PKCS1_OAEP.new(private_key)
        chunk_size = 512
        pointer = 0
        decrypted_info = []

        while (pointer < len(self.encrypted_info)):
            chunk = self.encrypted_info[pointer:pointer + chunk_size]
            decrypted_info.append(cipher.decrypt(chunk))
            pointer += chunk_size
        self.decrypted_info = b''.join(decrypted_info)

create_keys()
test = Encryption("id.jpg")
test.encrypt("public_key.pem")
test.decrypt("private_key.pem")

#Proof of concept
output_file = open("output_file.txt", "w+")
output_file.write(str(test.info))
output_file.write("\nTHIS IS A LINE BREAK\n")
output_file.write(str(test.encrypted_info))
output_file.write("\nTHIS IS A LINE BREAK\n")
output_file.write(str(test.decrypted_info))