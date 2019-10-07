import base64
#use the thing below in a class that takes in an image file

class Ecryption:
    def __init__(self, information):
        self.info = np.array(information)
    with open(information, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())
    