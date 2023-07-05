import { InferenceSession, Tensor } from "onnxruntime-web";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./assets/scss/App.scss";
import { handleImageScale } from "./components/helpers/scaleHelper";
import {
  modelScaleProps,
  multiMaskModelScaleProps,
} from "./components/helpers/Interfaces";
import {
  onnxMaskToContours,
  onnxMaskToImage,
} from "./components/helpers/maskUtils";
import {
  modelData,
  multiMaskModelData,
} from "./components/helpers/onnxModelAPI";
import Stage from "./components/Stage";
import AppContext from "./components/hooks/createContext";

import * as ImageHelper from "./components/helpers/ImageHelper";
const ort = require("onnxruntime-web");
/* @ts-ignore */
import npyjs from "npyjs";
import NewStage from "./components/NewStage";
import {
  findIouScore,
  findOptimalThreshold,
  predictSegmentScores,
} from "./utilities/FunctionalUtilities";
import { segmentProbability } from "./utilities/segmentProbability";

// Define image, embedding and model paths
const IMAGE_PATH = "/assets/data/spat_image.png";
const IMAGE_EMBEDDING = "/assets/data/testing_embedding.npy";
const MODEL_DIR = "/assets/data/spatImageWithExtraDataWithSingleMask.onnx";

interface Coordinate {
  x: number;
  y: number;
}

const App = () => {
  const {
    clicks: [clicks],
    image: [, setImage],
    maskImg: [, setMaskImg],
    clickedPoint: [click],
  } = useContext(AppContext)!;
  const [model, setModel] = useState<InferenceSession | null>(null); // ONNX model
  const [tensor, setTensor] = useState<Tensor | null>(null); // Image embedding tensor
  const [coordinates, setCoordinates] = useState<Coordinate[] | null | []>(
    null
  );

  const [prevMaskData, setPrevMaskData] = useState<
    | string[]
    | Uint8Array
    | Float32Array
    | Int8Array
    | Uint16Array
    | Int16Array
    | Int32Array
    | BigInt64Array
    | Float64Array
    | Uint32Array
    | BigUint64Array
    | null
  >(null);

  // The ONNX model expects the input to be rescaled to 1024.
  // The modelScale state variable keeps track of the scale values.
  const [modelScale, setModelScale] = useState<modelScaleProps | null>(null);
  const [multiMaskModelScaleProps, setMultiMaskModelScaleProps] =
    useState<multiMaskModelScaleProps | null>(null);

  // Initialize the ONNX model. load the image, and load the SAM
  // pre-computed image embedding
  useEffect(() => {
    // Initialize the ONNX model
    const initModel = async () => {
      try {
        if (MODEL_DIR === undefined) return;
        const URL: string = MODEL_DIR;
        const model = await InferenceSession.create(URL);
        setModel(model);
      } catch (e) {
        console.log(e);
      }
    };
    initModel();

    // Load the image
    const url = new URL(IMAGE_PATH, location.origin);
    loadImage(url);

    // Load the Segment Anything pre-computed embedding
    Promise.resolve(loadNpyTensor(IMAGE_EMBEDDING, "float32")).then(
      (embedding) => setTensor(embedding)
    );
  }, []);

  const loadImage = async (url: URL) => {
    try {
      const img = new Image();
      img.src = url.href;
      img.onload = () => {
        const { height, width, samScale } = handleImageScale(img);
        const {
          height: mh,
          width: mw,
          scale,
          uploadScale,
        } = ImageHelper.handleImageScale(img);
        setModelScale({
          height: height, // original image height
          width: width, // original image width
          samScale: samScale, // scaling factor for image which has been resized to longest side 1024
        });
        setMultiMaskModelScaleProps({
          onnxScale: scale / uploadScale,
          maskWidth: width * uploadScale,
          maskHeight: mh * uploadScale,
          scale: scale,
          uploadScale: uploadScale,
          width: mw,
          height: mh,
        });
        img.width = width;
        img.height = height;
        setImage(img);
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Decode a Numpy file into a tensor.
  const loadNpyTensor = async (tensorFile: string, dType: string) => {
    let npLoader = new npyjs();
    const npArray = await npLoader.load(tensorFile);
    const tensor = new ort.Tensor(dType, npArray.data, npArray.shape);
    return tensor;
  };

  // Run the ONNX model every time clicks has changed
  useEffect(() => {
    runONNX();
    runMultiMaskModel();
  }, [clicks]);

  useEffect(() => {
    runClickOnnx();
  }, [click]);

  const runMultiMaskModel = async () => {
    try {
      if (
        model === null ||
        clicks === null ||
        tensor === null ||
        multiMaskModelScaleProps === null
      ) {
        return;
      }
      const feeds = multiMaskModelData({
        clicks,
        tensor,
        modelScale: multiMaskModelScaleProps,
        last_pred_mask: null, // Only 1 click allowed, so no last predicted mask exists
      });
      if (feeds === undefined) return;

      const results = await model.run(feeds);
      // console.log(feeds);
    } catch (error) {
      console.log(error);
    }
  };

  const runClickOnnx = async () => {
    try {
      if (
        model === null ||
        click === null ||
        tensor === null ||
        modelScale === null
      ) {
        return;
      }
      // Prepare the model input in the correct format for SAM.
      // The modelData function is from onnxModelAPI.tsx.
      const feeds = modelData({
        clicks: [click],
        tensor,
        modelScale,
      });

      if (feeds === undefined) return;

      // Run the SAM ONNX model with the feeds returned from modelData()
      const results = await model.run(feeds);

      segmentProbability(click, results, feeds, "click");
    } catch (error) {}
  };

  const runONNX = async () => {
    try {
      if (
        model === null ||
        clicks === null ||
        tensor === null ||
        modelScale === null
      )
        return;
      else {
        // Prepare the model input in the correct format for SAM.
        // The modelData function is from onnxModelAPI.tsx.
        const feeds = modelData({
          clicks,
          tensor,
          modelScale,
        });

        if (feeds === undefined) return;
        // Run the SAM ONNX model with the feeds returned from modelData()
        const results = await model.run(feeds);

        // masking

        const output = results[model.outputNames[0]];
        // console.log(output.data);
        // The predicted mask returned from the ONNX model is an array which is
        // rendered as an HTML image using onnxMaskToImage() from maskUtils.tsx.
        // findCoordinates(output);

        const { imageDataToImage, coordinates: coco } = onnxMaskToImage(
          output.data,
          output.dims[2],
          output.dims[3]
        );
        // onnxMaskToContours(output.data, output.dims[2], output.dims[3]);

        setMaskImg(imageDataToImage);

        // segmentProbability(clicks[0], results, feeds, "hover");

        // setCoordinates(cocoClone);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadEmbedding = async () => {
    return Promise.resolve(loadNpyTensor(IMAGE_EMBEDDING, "float32")).then(
      (embedding) => embedding
    );
  };

  const findCoordinates = async (output: Array<number>) => {
    const xCoordinates = output.map((item: Object) => {
      // console.log(item);
    });

    // const current = await InferenceSession.create(MODEL_DIR);
    // const image = await loadImage(new URL(IMAGE_PATH, location.origin));
    // const embedding = await loadEmbedding();
  };

  return (
    <Stage
      coordinates={coordinates}
      scale={{
        height: modelScale?.height,
        width: modelScale?.width,
      }}
    />
  );
};

const DefaultApp = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route
        path="/"
        element={
          <div>
            <NewStage />
          </div>
        }
      /> */}
    </Routes>
  );
};

export default DefaultApp;
