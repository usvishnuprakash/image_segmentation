// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import { Image as Imo } from "image-js";

import { findContours } from "contours";

// Convert the onnx model mask prediction to ImageData
function arrayToImageData(input: any, width: number, height: number) {
  const [r, g, b, a] = [0, 114, 189, 255]; // the masks's blue color
  const arr = new Uint8ClampedArray(4 * width * height).fill(0);
  for (let i = 0; i < input.length; i++) {
    // Threshold the onnx model mask prediction at 0.0
    // This is equivalent to thresholding the mask using predictor.model.mask_threshold
    // in python
    if (input[i] > 0.0) {
      arr[4 * i + 0] = r;
      arr[4 * i + 1] = g;
      arr[4 * i + 2] = b;
      arr[4 * i + 3] = a;
    }
  }
  return new ImageData(arr, height, width);
}

// Use a Canvas element to produce an image from ImageData
function imageDataToImage(imageData: ImageData) {
  const canvas = imageDataToCanvas(imageData);
  const image = new Image();

  image.src = canvas.toDataURL();
  return image;
}

// Canvas elements can be created from ImageData
function imageDataToCanvas(imageData: ImageData) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  ctx?.putImageData(imageData, 0, 0);
  return canvas;
}

function findCoordinates(imageData: any) {
  const coordinates = [];

  for (let i = 0; i < imageData.length; i += 2) {
    const x = imageData[i];
    const y = imageData[i + 1];
    coordinates.push({ x, y });
  }
  // console.log(imageData);

  return coordinates;
  // return [];
}

// Assuming you have the segmentation mask data from the ONNX model in the form of a 2D array called 'maskData'

// Function to extract contours from the segmentation mask data
function extractContours(maskData: any) {
  const contours = [];

  // Iterate over the mask data
  for (let y = 0; y < maskData.length; y++) {
    for (let x = 0; x < maskData[0].length; x++) {
      // Check if the pixel value is non-zero
      if (maskData[y][x] !== 0) {
        const contour = traceContour(x, y, maskData);
        contours.push(contour);
      }
    }
  }

  return contours;
}

// Function to trace the contour starting from a given point
function traceContour(startX: any, startY: any, maskData: any) {
  const contour = [];
  let x = startX;
  let y = startY;
  let direction = 0;

  do {
    contour.push([x, y]);
    direction = (direction + 5) % 8;

    for (let i = 0; i < 8; i++) {
      const dx = Math.round(Math.cos((Math.PI * i) / 4));
      const dy = Math.round(Math.sin((Math.PI * i) / 4));
      const nx = x + dx;
      const ny = y + dy;

      if (isValidPoint(nx, ny, maskData) && maskData[ny][nx] !== 0) {
        x = nx;
        y = ny;
        direction = i;
        break;
      }
    }
  } while (x !== startX || y !== startY);

  return contour;
}

// Function to check if a point is valid within the mask data bounds
function isValidPoint(x: any, y: any, maskData: any) {
  return x >= 0 && y >= 0 && x < maskData[0].length && y < maskData.length;
}

// Call the extractContours function to get the contours from the segmentation mask data

function doo(maskData: any) {
  // const contours = extractContours(maskData);
  // Use the extracted contours for further processing or visualization
  // console.log(contours);
}

// Convert the onnx model mask output to an HTMLImageElement
export function onnxMaskToImage(input: any, width: number, height: number) {
  const arrayImData = arrayToImageData(input, width, height);
  const con = doo(input);
  interface Coordinate {
    x: number;
    y: number;
  }
  [];

  return {
    imageDataToImage: imageDataToImage(arrayImData),
    coordinates: findCoordinates(input),
  };
}

// export function traceOnnx() {
//   rleArray
// }

const extractContoursNew = async (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const image = await Imo.load(canvas.toDataURL());
    const grayImage = image.grey();
    const threshold = 128; // Adjust this value as per your image
    const binaryData = grayImage.data.map((pixel) =>
      pixel > threshold ? 255 : 0
    );
    const contours = findContours(binaryData);
    // console.log(contours);
  }
};

export async function onnxMaskToContours(
  input: any,
  width: number,
  height: number
) {
  const arrayImData = arrayToImageData(input, width, height);
  const canvas = imageDataToCanvas(arrayImData);
  extractContoursNew(canvas, width, height);
}
