import cv2
import sys
from segment_anything import sam_model_registry, SamAutomaticMaskGenerator, SamPredictor
sys.path.append("..")

sam_checkpoint = "models/sam_vit_l_0b3195.pth"
model_type = "vit_l"
device = "cpu"

image = cv2.imread('personalData/spat_image.png')

image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

sam = sam_model_registry[model_type](checkpoint=sam_checkpoint)
sam.to(device=device)


predictor = SamPredictor(sam)
predictor.set_image(image)
image_embedding = predictor.get_image_embedding().cpu().numpy()

print(image_embedding.shape)

print(predictor.model.mask_threshold)
