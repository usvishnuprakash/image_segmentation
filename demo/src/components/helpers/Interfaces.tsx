// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import { Tensor } from "onnxruntime-web";

export interface modelScaleProps {
  samScale: number;
  height: number;
  width: number;
}

export enum clickType {
  POSITIVE = 1.0,
  NEGATIVE = 0.0,
  UPPER_LEFT = 2.0,
  BOTTOM_RIGHT = 3.0,
}

export interface multiMaskModelScaleProps {
  onnxScale: number;
  maskWidth: number;
  maskHeight: number;
  scale: number;
  uploadScale: number;
  width: number;
  height: number;
}

export interface modelInputProps {
  x: number;
  y: number;
  width: null | number;
  height: null | number;
  clickType: number;
}

export interface modelInputProps {
  x: number;
  y: number;
  clickType: number;
}

export interface modeDataProps {
  clicks?: Array<modelInputProps>;
  tensor: Tensor;
  modelScale: modelScaleProps;
}

export interface ToolProps {
  handleMouseMove: (e: any) => void;
  handleSelectOnClick: (e: any) => void;
}
export interface multiMaskModelDataProps {
  clicks?: Array<modelInputProps>;
  tensor: Tensor;
  modelScale: multiMaskModelScaleProps;
  best_box?: number[];
  point_coords?: Array<number[]>;
  point_labels?: number[];
  last_pred_mask: Tensor | null;
}
