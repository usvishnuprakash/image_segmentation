import cv2
import sys
from segment_anything import sam_model_registry, SamAutomaticMaskGenerator
import numpy as np

import json
import base64

sys.path.append("..")

sam_checkpoint = "models/sam_vit_l_0b3195.pth"
model_type = "vit_l"
device = "cpu"

image = cv2.imread('personalData/spat_image.png')

image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

sam = sam_model_registry[model_type](checkpoint=sam_checkpoint)
sam.to(device=device)

mask_generator = SamAutomaticMaskGenerator(sam)
mask_generator.output_mode = None

masks = mask_generator.generate(image)


def convert_to_string(nd_array):
    nd_array = np.array(nd_array)

    flattened_array = nd_array.flatten().astype(int)

    # Step 2: Convert the flattened array to a string representation
    array_string = json.dumps(flattened_array.tolist())

    # Step 3: Encode the string
    encoded_string = base64.b64encode(array_string.encode()).decode()

    return encoded_string


id = 0
for i in masks:
    # encoded_string = convert_to_string(i["segmentation"])
    i["id"] = id
    id += 1
    i["segmentation"] = None


print(masks[0])
