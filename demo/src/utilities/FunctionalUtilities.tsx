export function findOptimalThreshold(iouData: any) {
  const iouScores = iouData.data; // Extract the IOU scores from the 'data' field

  let optimalThreshold = 0;
  let maxF1Score = 0;

  // Iterate over a range of threshold values
  for (let threshold = 0.1; threshold <= 0.9; threshold += 0.1) {
    let truePositives = 0;
    let falsePositives = 0;
    let falseNegatives = 0;

    // Calculate the true positives, false positives, and false negatives based on the threshold
    for (let i = 0; i < iouScores.length; i++) {
      const iouScore = iouScores[i];

      if (iouScore > threshold) {
        truePositives++;
      } else {
        falseNegatives++;
      }
    }

    // Calculate precision, recall, and F1 score
    const precision = truePositives / (truePositives + falsePositives);
    const recall = truePositives / (truePositives + falseNegatives);
    const f1Score = (2 * precision * recall) / (precision + recall);

    // Update the optimal threshold if a higher F1 score is achieved
    if (f1Score > maxF1Score) {
      maxF1Score = f1Score;
      optimalThreshold = threshold;
    }
  }

  return optimalThreshold;
}

export function predictSegmentScores(iouData: any, threshold: number) {
  const iouScores = iouData.data; // Extract the IOU scores from the 'data' field
  // Set the IOU threshold value

  //   const segmentScores = []; // Array to store the predicted scores for each intersected segment

  let totaliouScore = 0;
  // Iterate over the IOU scores and make a prediction for each intersected segment
  //   for (let i = 0; i < iouScores.length; i++) {
  //     const iouScore = iouScores[i];

  //     // Predict the score based on the IOU score and the threshold
  //     // const segmentScore = iouScore > threshold ? 1 : 0;

  //     // segmentScores.push(segmentScore); // Store the predicted score
  //   }
  for (let each of iouScores) {
    totaliouScore += each;
  }

  return totaliouScore;
}

export function findIouScore(md: any, prevMaskData: any) {
  // Compute the intersection
  if (!prevMaskData) {
    return;
  }
  const maskData = md.data;
  // Convert the Float32Array mask data to a regular array
  const convertedMaskData = Array.from(maskData);

  // Compute the intersection (which is the mask itself)
  const intersection = convertedMaskData.map((pixel) => pixel);

  // Compute the union (which is also the mask itself)
  const union = convertedMaskData.map((pixel) => pixel);

  // Calculate the area of intersection and union
  // @ts-ignore
  const intersectionArea = intersection.reduce((acc, val) => acc + val, 0);
  // @ts-ignore
  const unionArea = union.reduce((acc, val) => acc + val, 0);

  // Calculate the IoU score
  // @ts-ignore
  const iouScore = intersectionArea / unionArea;

  // console.log("IoU score:", iouScore);
}

// from onnx model cut

//  // !
//  const originalImageSize = [494, 744];
//  const scaledImageSize = [
//    document.getElementById("sourceImage")?.clientHeight || 494,
//    document.getElementById("sourceImage")?.clientWidth || 744,
//  ];

//  const hoverX_scaled = clicks[0].x; // X coordinate of the hover point in the scaled image
//  const hoverY_scaled = clicks[0].y; // Y coordinate of the hover point in the scaled image

//  const widthScaleFactor = originalImageSize[1] / scaledImageSize[1];
//  const heightScaleFactor = originalImageSize[0] / scaledImageSize[0];

//  // Scale the hover point coordinates to match the original image size
//  const hoverX_original = hoverX_scaled;
//  const hoverY_original = hoverY_scaled;

//  let hoveredBoundingBox = null;

//  // Iterate through the bounding boxes and check if the hover point is within each bounding box
//  for (const boundingBox of segmentationData) {
//    const [bboxX, bboxY, bboxWidth, bboxHeight] = boundingBox.bbox;

//    if (
//      bboxX <= hoverX_original &&
//      hoverX_original <= bboxX + bboxWidth &&
//      bboxY <= hoverY_original &&
//      hoverY_original <= bboxY + bboxHeight
//    ) {
//      hoveredBoundingBox = boundingBox;
//      break;
//    }
//  }

//  // Check if the hover point is within any bounding box
//  if (hoveredBoundingBox) {
//    console.log("asdfkjafd", hoveredBoundingBox.id);
//  }
//  // else {
//  //   console.log(
//  //     "Hover point is within bounding box with ID:",
//  //     hoveredBoundingBox
//  //   );
//  // }

//  // !

//  // console.log("outputNames", model.outputNames);
//  // console.log("results", results);
//  setPrevMaskData(results[model.outputNames[0]].data);
//  // findIouScore(results[model.outputNames[0]], prevMaskData);

//  const thres = findOptimalThreshold(results[model.outputNames[1]]);

//  const score = predictSegmentScores(
//    results[model.outputNames[1]],
//    thres
//  );
//  // console.log("score", score);
//  const profiling = model.startProfiling();
//  // console.log("profiling", profiling);
//  // console.log("result", results);
