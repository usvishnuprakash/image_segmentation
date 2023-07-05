import React from "react";
import { modelInputProps } from "../components/helpers/Interfaces";

// Interfaces

interface findByTwoValuesInterface {
  currentDifference: number;
  isPresent: Boolean;
}

interface iouThresholdListInterface {
  iouDifference: number;
  stabilityScoreDifference: number;
  actualIndex: number;
}

const segmentationData = [
  {
    segmentation: null,
    area: 21180,
    bbox: [532, 75, 90, 338],
    predicted_iou: 1.0539827346801758,
    point_coords: [[569.625, 146.65625]],
    stability_score: 0.9825431704521179,
    crop_box: [0, 0, 744, 494],
    id: 0,
  },
  {
    segmentation: null,
    area: 70123,
    bbox: [0, 359, 743, 133],
    predicted_iou: 1.0358284711837769,
    point_coords: [[197.625, 439.96875]],
    stability_score: 0.9911655187606812,
    crop_box: [0, 0, 744, 494],
    id: 1,
  },
  {
    segmentation: null,
    area: 19681,
    bbox: [195, 109, 121, 199],
    predicted_iou: 1.0296411514282227,
    point_coords: [[197.625, 223.84375]],
    stability_score: 0.9741002917289734,
    crop_box: [0, 0, 744, 494],
    id: 2,
  },
  {
    segmentation: null,
    area: 34075,
    bbox: [161, 42, 155, 401],
    predicted_iou: 1.0262439250946045,
    point_coords: [[220.875, 254.71875]],
    stability_score: 0.9839767217636108,
    crop_box: [0, 0, 744, 494],
    id: 3,
  },
  {
    segmentation: null,
    area: 8624,
    bbox: [169, 275, 112, 150],
    predicted_iou: 1.0147510766983032,
    point_coords: [[244.125, 393.65625]],
    stability_score: 0.9892783164978027,
    crop_box: [0, 0, 744, 494],
    id: 4,
  },
  {
    segmentation: null,
    area: 40167,
    bbox: [0, 0, 290, 316],
    predicted_iou: 1.0085855722427368,
    point_coords: [[197.625, 301.03125]],
    stability_score: 0.9620385766029358,
    crop_box: [0, 0, 744, 494],
    id: 5,
  },
  {
    segmentation: null,
    area: 860,
    bbox: [214, 413, 35, 30],
    predicted_iou: 1.0041488409042358,
    point_coords: [[244.125, 439.96875]],
    stability_score: 0.9907621145248413,
    crop_box: [0, 0, 744, 494],
    id: 6,
  },
  {
    segmentation: null,
    area: 1086,
    bbox: [252, 42, 46, 40],
    predicted_iou: 1.0023901462554932,
    point_coords: [[267.375, 69.46875]],
    stability_score: 0.9917582273483276,
    crop_box: [0, 0, 744, 494],
    id: 7,
  },
  {
    segmentation: null,
    area: 1753,
    bbox: [0, 0, 53, 43],
    predicted_iou: 0.9995183944702148,
    point_coords: [[11.625, 23.15625]],
    stability_score: 0.9863868355751038,
    crop_box: [0, 0, 744, 494],
    id: 8,
  },
  {
    segmentation: null,
    area: 9886,
    bbox: [146, 32, 134, 249],
    predicted_iou: 0.9949920177459717,
    point_coords: [[174.375, 38.59375]],
    stability_score: 0.9662619233131409,
    crop_box: [0, 0, 744, 494],
    id: 9,
  },
  {
    segmentation: null,
    area: 4623,
    bbox: [532, 84, 84, 188],
    predicted_iou: 0.9911011457443237,
    point_coords: [[546.375, 162.09375]],
    stability_score: 0.9716357588768005,
    crop_box: [0, 0, 744, 494],
    id: 10,
  },
  {
    segmentation: null,
    area: 592,
    bbox: [0, 0, 33, 19],
    predicted_iou: 0.9879970550537109,
    point_coords: [[11.625, 7.71875]],
    stability_score: 0.9782244563102722,
    crop_box: [0, 0, 744, 494],
    id: 11,
  },
  {
    segmentation: null,
    area: 4479,
    bbox: [531, 50, 86, 95],
    predicted_iou: 0.9860022068023682,
    point_coords: [[592.875, 69.46875]],
    stability_score: 0.9634093046188354,
    crop_box: [0, 0, 744, 494],
    id: 12,
  },
  {
    segmentation: null,
    area: 1136,
    bbox: [0, 16, 53, 28],
    predicted_iou: 0.9851933121681213,
    point_coords: [[34.875, 23.15625]],
    stability_score: 0.9817073345184326,
    crop_box: [0, 0, 744, 494],
    id: 13,
  },
  {
    segmentation: null,
    area: 8725,
    bbox: [393, 112, 90, 98],
    predicted_iou: 0.9828499555587769,
    point_coords: [[453.375, 115.78125]],
    stability_score: 0.9572283029556274,
    crop_box: [0, 0, 744, 494],
    id: 14,
  },
  {
    segmentation: null,
    area: 7709,
    bbox: [145, 31, 110, 111],
    predicted_iou: 0.981245219707489,
    point_coords: [[151.125, 38.59375]],
    stability_score: 0.9571846127510071,
    crop_box: [0, 0, 744, 494],
    id: 15,
  },
  {
    segmentation: null,
    area: 3442,
    bbox: [0, 0, 80, 66],
    predicted_iou: 0.9806101322174072,
    point_coords: [[58.125, 54.03125]],
    stability_score: 0.9804090857505798,
    crop_box: [0, 0, 744, 494],
    id: 16,
  },
  {
    segmentation: null,
    area: 355,
    bbox: [260, 138, 12, 46],
    predicted_iou: 0.9794336557388306,
    point_coords: [[267.375, 162.09375]],
    stability_score: 0.9859943985939026,
    crop_box: [0, 0, 744, 494],
    id: 17,
  },
  {
    segmentation: null,
    area: 1259,
    bbox: [0, 170, 58, 27],
    predicted_iou: 0.9790893793106079,
    point_coords: [[11.625, 192.96875]],
    stability_score: 0.9810874462127686,
    crop_box: [0, 0, 744, 494],
    id: 18,
  },
  {
    segmentation: null,
    area: 6553,
    bbox: [656, 117, 78, 88],
    predicted_iou: 0.9777930974960327,
    point_coords: [[662.625, 131.21875]],
    stability_score: 0.9721465110778809,
    crop_box: [0, 0, 744, 494],
    id: 19,
  },
  {
    segmentation: null,
    area: 499,
    bbox: [0, 121, 21, 29],
    predicted_iou: 0.9776213765144348,
    point_coords: [[11.625, 146.65625]],
    stability_score: 0.9920159578323364,
    crop_box: [0, 0, 744, 494],
    id: 20,
  },
  {
    segmentation: null,
    area: 966,
    bbox: [169, 398, 36, 41],
    predicted_iou: 0.9775460958480835,
    point_coords: [[174.375, 424.53125]],
    stability_score: 0.980512797832489,
    crop_box: [0, 0, 744, 494],
    id: 21,
  },
  {
    segmentation: null,
    area: 1850,
    bbox: [253, 69, 45, 71],
    predicted_iou: 0.9772285223007202,
    point_coords: [[267.375, 131.21875]],
    stability_score: 0.9581345915794373,
    crop_box: [0, 0, 744, 494],
    id: 22,
  },
  {
    segmentation: null,
    area: 8250,
    bbox: [288, 306, 93, 108],
    predicted_iou: 0.9771687984466553,
    point_coords: [[360.375, 316.46875]],
    stability_score: 0.9747698307037354,
    crop_box: [0, 0, 744, 494],
    id: 23,
  },
  {
    segmentation: null,
    area: 3972,
    bbox: [149, 178, 46, 105],
    predicted_iou: 0.9747694730758667,
    point_coords: [[151.125, 254.71875]],
    stability_score: 0.9731343388557434,
    crop_box: [0, 0, 744, 494],
    id: 24,
  },
  {
    segmentation: null,
    area: 872,
    bbox: [415, 172, 49, 23],
    predicted_iou: 0.9741849899291992,
    point_coords: [[453.375, 177.53125]],
    stability_score: 0.9839816689491272,
    crop_box: [0, 0, 744, 494],
    id: 25,
  },
  {
    segmentation: null,
    area: 860,
    bbox: [416, 39, 48, 23],
    predicted_iou: 0.9740367531776428,
    point_coords: [[453.375, 54.03125]],
    stability_score: 0.9804597496986389,
    crop_box: [0, 0, 744, 494],
    id: 26,
  },
  {
    segmentation: null,
    area: 1210,
    bbox: [160, 372, 45, 67],
    predicted_iou: 0.9714068174362183,
    point_coords: [[174.375, 424.53125]],
    stability_score: 0.9731707572937012,
    crop_box: [0, 0, 744, 494],
    id: 27,
  },
  {
    segmentation: null,
    area: 696,
    bbox: [675, 171, 42, 21],
    predicted_iou: 0.970766007900238,
    point_coords: [[685.875, 177.53125]],
    stability_score: 0.9745762944221497,
    crop_box: [0, 0, 744, 494],
    id: 28,
  },
  {
    segmentation: null,
    area: 23193,
    bbox: [294, 0, 87, 316],
    predicted_iou: 0.9698487520217896,
    point_coords: [[360.375, 301.03125]],
    stability_score: 0.9642355442047119,
    crop_box: [0, 0, 744, 494],
    id: 29,
  },
  {
    segmentation: null,
    area: 5558,
    bbox: [393, 0, 93, 80],
    predicted_iou: 0.9673589468002319,
    point_coords: [[430.125, 69.46875]],
    stability_score: 0.9584726095199585,
    crop_box: [0, 0, 744, 494],
    id: 30,
  },
  {
    segmentation: null,
    area: 714,
    bbox: [681, 50, 42, 22],
    predicted_iou: 0.966179609298706,
    point_coords: [[709.125, 54.03125]],
    stability_score: 0.9764543175697327,
    crop_box: [0, 0, 744, 494],
    id: 31,
  },
  {
    segmentation: null,
    area: 1030,
    bbox: [173, 100, 57, 25],
    predicted_iou: 0.9644210934638977,
    point_coords: [[220.875, 115.78125]],
    stability_score: 0.9807876944541931,
    crop_box: [0, 0, 744, 494],
    id: 32,
  },
  {
    segmentation: null,
    area: 2943,
    bbox: [0, 309, 202, 22],
    predicted_iou: 0.9621492624282837,
    point_coords: [[104.625, 316.46875]],
    stability_score: 0.9705192446708679,
    crop_box: [0, 0, 744, 494],
    id: 33,
  },
  {
    segmentation: null,
    area: 6737,
    bbox: [0, 103, 85, 111],
    predicted_iou: 0.9621118307113647,
    point_coords: [[58.125, 177.53125]],
    stability_score: 0.9530434608459473,
    crop_box: [0, 0, 744, 494],
    id: 34,
  },
  {
    segmentation: null,
    area: 50921,
    bbox: [0, 283, 743, 131],
    predicted_iou: 0.9620628952980042,
    point_coords: [[616.125, 331.90625]],
    stability_score: 0.9546687602996826,
    crop_box: [0, 0, 744, 494],
    id: 35,
  },
  {
    segmentation: null,
    area: 176,
    bbox: [562, 68, 16, 23],
    predicted_iou: 0.9579285979270935,
    point_coords: [[569.625, 69.46875]],
    stability_score: 1.0,
    crop_box: [0, 0, 744, 494],
    id: 36,
  },
  {
    segmentation: null,
    area: 23924,
    bbox: [376, 283, 367, 102],
    predicted_iou: 0.9569501876831055,
    point_coords: [[476.625, 378.21875]],
    stability_score: 0.9787049293518066,
    crop_box: [0, 0, 744, 494],
    id: 37,
  },
  {
    segmentation: null,
    area: 302,
    bbox: [684, 134, 15, 23],
    predicted_iou: 0.9565345644950867,
    point_coords: [[685.875, 146.65625]],
    stability_score: 0.9771241545677185,
    crop_box: [0, 0, 744, 494],
    id: 38,
  },
  {
    segmentation: null,
    area: 2525,
    bbox: [0, 121, 58, 76],
    predicted_iou: 0.9565067291259766,
    point_coords: [[11.625, 192.96875]],
    stability_score: 0.9692367315292358,
    crop_box: [0, 0, 744, 494],
    id: 39,
  },
  {
    segmentation: null,
    area: 759,
    bbox: [690, 11, 25, 41],
    predicted_iou: 0.9553139209747314,
    point_coords: [[709.125, 38.59375]],
    stability_score: 0.9637305736541748,
    crop_box: [0, 0, 744, 494],
    id: 40,
  },
  {
    segmentation: null,
    area: 2103,
    bbox: [173, 53, 57, 72],
    predicted_iou: 0.952666163444519,
    point_coords: [[174.375, 115.78125]],
    stability_score: 0.971361517906189,
    crop_box: [0, 0, 744, 494],
    id: 41,
  },
  {
    segmentation: null,
    area: 18793,
    bbox: [0, 309, 288, 106],
    predicted_iou: 0.9507728815078735,
    point_coords: [[81.375, 378.21875]],
    stability_score: 0.953726053237915,
    crop_box: [0, 0, 744, 494],
    id: 42,
  },
  {
    segmentation: null,
    area: 370,
    bbox: [260, 138, 12, 135],
    predicted_iou: 0.9498425722122192,
    point_coords: [[267.375, 177.53125]],
    stability_score: 0.9630606770515442,
    crop_box: [0, 0, 744, 494],
    id: 43,
  },
  {
    segmentation: null,
    area: 669,
    bbox: [0, 207, 85, 7],
    predicted_iou: 0.9481872916221619,
    point_coords: [[58.125, 208.40625]],
    stability_score: 0.9895833134651184,
    crop_box: [0, 0, 744, 494],
    id: 44,
  },
  {
    segmentation: null,
    area: 374,
    bbox: [424, 130, 25, 24],
    predicted_iou: 0.9458817839622498,
    point_coords: [[430.125, 146.65625]],
    stability_score: 0.9506493210792542,
    crop_box: [0, 0, 744, 494],
    id: 45,
  },
  {
    segmentation: null,
    area: 1368,
    bbox: [676, 134, 41, 58],
    predicted_iou: 0.9458140134811401,
    point_coords: [[685.875, 177.53125]],
    stability_score: 0.9612625241279602,
    crop_box: [0, 0, 744, 494],
    id: 46,
  },
  {
    segmentation: null,
    area: 1531,
    bbox: [680, 11, 43, 61],
    predicted_iou: 0.9448728561401367,
    point_coords: [[709.125, 54.03125]],
    stability_score: 0.9620822668075562,
    crop_box: [0, 0, 744, 494],
    id: 47,
  },
  {
    segmentation: null,
    area: 319,
    bbox: [424, 0, 18, 20],
    predicted_iou: 0.9425321817398071,
    point_coords: [[430.125, 7.71875]],
    stability_score: 0.9844720363616943,
    crop_box: [0, 0, 744, 494],
    id: 48,
  },
  {
    segmentation: null,
    area: 483,
    bbox: [181, 53, 30, 27],
    predicted_iou: 0.9411527514457703,
    point_coords: [[197.625, 54.03125]],
    stability_score: 0.9572301506996155,
    crop_box: [0, 0, 744, 494],
    id: 49,
  },
  {
    segmentation: null,
    area: 346,
    bbox: [690, 11, 23, 25],
    predicted_iou: 0.9409520626068115,
    point_coords: [[709.125, 23.15625]],
    stability_score: 0.9658119678497314,
    crop_box: [0, 0, 744, 494],
    id: 50,
  },
  {
    segmentation: null,
    area: 1707,
    bbox: [415, 130, 49, 65],
    predicted_iou: 0.9399764537811279,
    point_coords: [[430.125, 192.96875]],
    stability_score: 0.9604584574699402,
    crop_box: [0, 0, 744, 494],
    id: 51,
  },
  {
    segmentation: null,
    area: 1106,
    bbox: [264, 0, 25, 46],
    predicted_iou: 0.9398095607757568,
    point_coords: [[267.375, 7.71875]],
    stability_score: 0.9655172228813171,
    crop_box: [0, 0, 744, 494],
    id: 52,
  },
  {
    segmentation: null,
    area: 446,
    bbox: [181, 53, 20, 27],
    predicted_iou: 0.9371350407600403,
    point_coords: [[197.625, 69.46875]],
    stability_score: 0.9866962432861328,
    crop_box: [0, 0, 744, 494],
    id: 53,
  },
  {
    segmentation: null,
    area: 554,
    bbox: [5, 155, 34, 18],
    predicted_iou: 0.9347976446151733,
    point_coords: [[34.875, 162.09375]],
    stability_score: 0.9786477088928223,
    crop_box: [0, 0, 744, 494],
    id: 54,
  },
  {
    segmentation: null,
    area: 626,
    bbox: [393, 203, 89, 8],
    predicted_iou: 0.9310686588287354,
    point_coords: [[406.875, 208.40625]],
    stability_score: 0.9748031497001648,
    crop_box: [0, 0, 744, 494],
    id: 55,
  },
  {
    segmentation: null,
    area: 206,
    bbox: [264, 245, 9, 30],
    predicted_iou: 0.9302234053611755,
    point_coords: [[267.375, 270.15625]],
    stability_score: 0.9759615659713745,
    crop_box: [0, 0, 744, 494],
    id: 56,
  },
  {
    segmentation: null,
    area: 389,
    bbox: [427, 22, 27, 19],
    predicted_iou: 0.927828848361969,
    point_coords: [[430.125, 38.59375]],
    stability_score: 0.9526184797286987,
    crop_box: [0, 0, 744, 494],
    id: 57,
  },
  {
    segmentation: null,
    area: 829,
    bbox: [564, 73, 35, 55],
    predicted_iou: 0.926419734954834,
    point_coords: [[569.625, 84.90625]],
    stability_score: 0.9563679099082947,
    crop_box: [0, 0, 744, 494],
    id: 58,
  },
  {
    segmentation: null,
    area: 60,
    bbox: [22, 489, 12, 4],
    predicted_iou: 0.9251973628997803,
    point_coords: [[34.875, 486.28125]],
    stability_score: 0.9523809552192688,
    crop_box: [0, 0, 744, 494],
    id: 59,
  },
  {
    segmentation: null,
    area: 678,
    bbox: [0, 121, 39, 35],
    predicted_iou: 0.9236259460449219,
    point_coords: [[11.625, 146.65625]],
    stability_score: 0.9709724187850952,
    crop_box: [0, 0, 744, 494],
    id: 60,
  },
  {
    segmentation: null,
    area: 517,
    bbox: [186, 82, 30, 20],
    predicted_iou: 0.9215919971466064,
    point_coords: [[197.625, 100.34375]],
    stability_score: 0.9659090638160706,
    crop_box: [0, 0, 744, 494],
    id: 61,
  },
  {
    segmentation: null,
    area: 423,
    bbox: [424, 0, 28, 27],
    predicted_iou: 0.9214980602264404,
    point_coords: [[430.125, 7.71875]],
    stability_score: 0.9651972055435181,
    crop_box: [0, 0, 744, 494],
    id: 62,
  },
  {
    segmentation: null,
    area: 1671,
    bbox: [416, 0, 48, 62],
    predicted_iou: 0.9168117046356201,
    point_coords: [[430.125, 54.03125]],
    stability_score: 0.9526038765907288,
    crop_box: [0, 0, 744, 494],
    id: 63,
  },
  {
    segmentation: null,
    area: 1260,
    bbox: [416, 25, 49, 37],
    predicted_iou: 0.9158979654312134,
    point_coords: [[430.125, 38.59375]],
    stability_score: 0.9655981063842773,
    crop_box: [0, 0, 744, 494],
    id: 64,
  },
  {
    segmentation: null,
    area: 376,
    bbox: [426, 157, 26, 17],
    predicted_iou: 0.9012995362281799,
    point_coords: [[430.125, 162.09375]],
    stability_score: 0.9685863852500916,
    crop_box: [0, 0, 744, 494],
    id: 65,
  },
];

const findByTwoValues = (
  originalIou: number,
  onnxPredictedIou: number
  // initialThreshold: number
) => {
  // Calculate the absolute difference between 'a' and 'b'
  const difference = Math.abs(originalIou - onnxPredictedIou);

  // if (difference <= initialThreshold) {
  //   console.log("a is close to b");
  //   return { currentDifference: difference, isPresent: true };
  // }
  return { currentDifference: difference, isPresent: true };
};

const findCloseToBbox = (
  bbox: Array<number>,
  hoverX_original: number,
  hoverY_original: number
) => {
  const [bboxX, bboxY, bboxWidth, bboxHeight] = bbox;
  if (
    bboxX <= hoverX_original &&
    hoverX_original <= bboxX + bboxWidth &&
    bboxY <= hoverY_original &&
    hoverY_original <= bboxY + bboxHeight
  ) {
    return true;
  }
  return false;
};
// !exports
export const segmentProbability = (
  click: modelInputProps,
  modelResult: any,
  feeds: any,
  clickType?: string
) => {
  // Scale the hover point coordinates to match the original image size
  const hoverX_original = click.x;
  const hoverY_original = click.y;

  const stabilityTolerance: number[] = [];
  const scoreTolerance: number[] = [];

  // Iterate through the bounding boxes and check if the hover point is within each bounding box
  let hoveredBoundingBox = segmentationData.filter((boundingBox) => {
    if (findCloseToBbox(boundingBox.bbox, hoverX_original, hoverY_original)) {
      return true;
    }
  });

  let final: any = {};

  // if (hoveredBoundingBox[1]) {
  //   const iouThresholdList: iouThresholdListInterface[] = [];

  //   const ious: any = [];

  //   for (let i = 0; i < hoveredBoundingBox.length; i++) {
  //     const boundingBox = hoveredBoundingBox[i];

  //     // for iou score
  //     const { currentDifference: iouDifference }: findByTwoValuesInterface =
  //       findByTwoValues(
  //         boundingBox.predicted_iou,
  //         modelResult.scores.data[0]
  //         // 0.88
  //       );

  //     const {
  //       currentDifference: stabilityScoreDifference,
  //     }: findByTwoValuesInterface = findByTwoValues(
  //       boundingBox.stability_score,
  //       modelResult.stability_scores.data[0]
  //       // 0.88
  //     );

  //     ious.push(boundingBox);
  //     iouThresholdList.push({
  //       iouDifference: iouDifference,
  //       stabilityScoreDifference: stabilityScoreDifference,
  //       actualIndex: i,
  //     });
  //   }
  //   if (iouThresholdList[1]) {
  //     iouThresholdList.sort((a, b) => {
  //       const aiouDifference = a.iouDifference - b.iouDifference;
  //       const scoreDifference =
  //         a.stabilityScoreDifference - b.stabilityScoreDifference;
  //       return aiouDifference - scoreDifference;
  //     });
  //   }

  //   if (ious.length) {
  //     final = ious[iouThresholdList[0].actualIndex];
  //   }
  //   // console.log("iouThresholdList", iouThresholdList);
  // }

  // if (hoveredBoundingBox[1]) {
  //   let ious = hoveredBoundingBox;
  //   let value = modelResult.scores.data[0];
  //   let closestSmallerIou: any = null;

  //   for (let i = 0; i < ious.length; i++) {
  //     let iou = ious[i].predicted_iou;
  //     if (
  //       iou < value &&
  //       (closestSmallerIou === null || iou > closestSmallerIou.predicted_iou)
  //     ) {
  //       closestSmallerIou = ious[i];
  //     }
  //   }

  //   console.log(closestSmallerIou);
  // }

  if (segmentationData[1]) {
    const data = segmentationData;

    const hoveringPoint = {
      x: hoverX_original,
      y: hoverY_original,
    };

    // Function to calculate Euclidean distance between two points
    function getDistance(x1: any, y1: any, x2: any, y2: any) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    }

    let closestSegment = null;
    let minDistance = Infinity;

    // Initialize variables to store the closest segment

    let closestDistance = Infinity;

    // Iterate over each segment
    for (const segment of data) {
      // Calculate the center point of the segment's bounding box
      const bboxCenterX = segment.bbox[0] + segment.bbox[2] / 2;
      const bboxCenterY = segment.bbox[1] + segment.bbox[3] / 2;

      // Calculate the Euclidean distance between the hovering point and the bbox center
      const distance = Math.sqrt(
        Math.pow(hoveringPoint.x - bboxCenterX, 2) +
          Math.pow(hoveringPoint.y - bboxCenterY, 2)
      );

      // Check if the current segment is closer than the previous closest segment
      if (distance < closestDistance) {
        // Update the closest segment and distance
        closestSegment = segment;
        closestDistance = distance;
      }
    }

    // Output the closest segment
    console.log("Closest Segment:", closestSegment);
  }

  if (!final) {
    final = hoveredBoundingBox[0];
  }

  if (!final) {
    final = hoveredBoundingBox[0];
  }
  console.log("hoveredpoint", final.id);

  if (clickType === "click") {
    // console.log("hoveredBoundingBox", hoveredBoundingBox);
  }
};

// with stability score
// if (hoveredBoundingBox[1]) {
//   const scoresThresholdList: iouThresholdListInterface[] = [];
//   const scores: any = [];
//   for (let i = 0; i < hoveredBoundingBox.length; i++) {
//     const boundingBox = hoveredBoundingBox[i];
//     const { currentDifference }: findByTwoValuesInterface =
//       findByTwoValues(
//         boundingBox.predicted_iou,
//         // @ts-ignore
//         results[model.outputNames[1]].data[0]
//         // 0.88
//       );

//     scores.push(boundingBox);
//     scoresThresholdList.push({
//       difference: currentDifference,
//       actualIndex: i,
//     });
//   }
//   if (scoresThresholdList[1]) {
//     scoresThresholdList.sort((a, b) => a.difference - b.difference);
//   }
// }
