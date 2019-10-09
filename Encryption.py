import base64
import numpy as np
import cryptography as cp
#use the thing below in a class that takes in an image file

class Ecryption:
    """A class used for encryption"""
    def __init__(self, information):
        with open(information, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        self.info = encoded_string.decode
    def encode(self):
