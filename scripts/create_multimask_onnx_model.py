import onnx
from segment_anything import sam_model_registry
from segment_anything.utils.onnx import SamOnnxModel
import sys

import warnings
import torch

sys.path.append("..")

sam_checkpoint = "models/sam_vit_l_0b3195.pth"
model_type = "vit_l"

device = "cpu"

sam = sam_model_registry[model_type](checkpoint=sam_checkpoint)
sam.to(device=device)

onnx_model = SamOnnxModel(sam, return_single_mask=True,
                          use_stability_score=True, return_extra_metrics=True)

dynamic_axes = {
    "point_coords": {1: "num_points"},
    "point_labels": {1: "num_points"},
}

embed_dim = sam.prompt_encoder.embed_dim
embed_size = sam.prompt_encoder.image_embedding_size
mask_input_size = [4 * x for x in embed_size]

onnx_model_path = "spatImageWithExtraDataWithSingleMask.onnx"

dummy_inputs = {
    "image_embeddings": torch.randn(1, embed_dim, *embed_size, dtype=torch.float),
    "point_coords": torch.randint(low=0, high=1024, size=(1, 5, 2), dtype=torch.float),
    "point_labels": torch.randint(low=0, high=4, size=(1, 5), dtype=torch.float),
    "mask_input": torch.randn(1, 1, *mask_input_size, dtype=torch.float),
    "has_mask_input": torch.tensor([1], dtype=torch.float),
    "orig_im_size": torch.tensor([1500, 2250], dtype=torch.float),
}
output_names = ["upscaled_masks", "scores", "stability_scores", "areas", "masks"]

with warnings.catch_warnings():
    warnings.filterwarnings("ignore", category=torch.jit.TracerWarning)
    warnings.filterwarnings("ignore", category=UserWarning)
    with open(onnx_model_path, "wb") as f:
        torch.onnx.export(
            onnx_model,
            tuple(dummy_inputs.values()),
            f,
            export_params=True,
            verbose=False,
            opset_version=17,
            do_constant_folding=True,
            input_names=list(dummy_inputs.keys()),
            output_names=output_names,
            dynamic_axes=dynamic_axes,
        )

# onnx_model = onnx.load('spatImageWithExtraDataWithSingleMask.onnx')


# # Create a new input for segment IDs
# segment_id_input = onnx.helper.make_tensor_value_info(
#     'segment_ids', onnx.TensorProto.INT32, [1])  # Adjust the shape as needed

# # Add the segment ID input to the model's inputs
# onnx_model.graph.input.extend([segment_id_input])


# onnx.save(onnx_model, 'jojo.onnx')
