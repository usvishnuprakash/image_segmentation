// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import React, { useContext, useEffect, useRef } from "react";
import * as _ from "underscore";
import Tool from "./Tool";
import { modelInputProps } from "./helpers/Interfaces";
import AppContext from "./hooks/createContext";

interface Coordinate {
  x: number;
  y: number;
}
interface Scale {
  height: number | undefined;
  width: number | undefined;
}

const Stage = ({
  coordinates,
  scale,
}: {
  coordinates: Coordinate[] | null | [];
  scale: Scale;
}) => {
  const {
    clicks: [, setClicks],
    image: [image],
  } = useContext(AppContext)!;

  const getClick = (x: number, y: number): modelInputProps => {
    const clickType = 1;
    return { x, y, clickType };
  };

  const maskCanvasRef = useRef(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (maskCanvasRef.current && maskCanvasRef.current !== null) {
      const canvas = maskCanvasRef.current as HTMLCanvasElement;
      const ima = imageRef.current as HTMLImageElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const maskImage = () => {
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          ctx?.drawImage(ima, 0, 0);

          coordinates?.forEach(({ x, y }) => {
            if (ctx !== null) {
              ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            }

            ctx?.fillRect(x, y, scale?.width ?? 0, scale.height ?? 0);
          });
        };

        const image = imageRef.current;

        if (canvas !== undefined) {
          canvas.width = scale.width ?? 0;
          canvas.height = scale.height ?? 0;
        }
        ctx.drawImage(ima, 0, 0);
        maskImage();
        console.log("draw one time ");
      }
    }
  }, [coordinates]);

  // Get mouse position and scale the (x, y) coordinates back to the natural
  // scale of the image. Update the state of clicks with setClicks to trigger
  // the ONNX model to run and generate a new mask via a useEffect in App.tsx
  const handleMouseMove = _.throttle((e: any) => {
    console.log("hello world");
    let el = e.nativeEvent.target;
    const rect = el.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    const imageScale = image ? image.width / el.offsetWidth : 1;
    x *= imageScale;
    y *= imageScale;
    const click = getClick(x, y);
    if (click) setClicks([click]);
  }, 15);

  const flexCenterClasses = "flex items-center justify-center";
  return (
    <>
      {" "}
      <div className={`${flexCenterClasses} w-full h-full`}>
        <div className={`${flexCenterClasses} relative w-[90%] h-[90%]`}>
          <Tool handleMouseMove={handleMouseMove} />
        </div>
      </div>
      <div>
        <canvas ref={maskCanvasRef} id="maskCanvas"></canvas>
        <img ref={imageRef} src="/assets/data/spat_image.png" alt="" />
      </div>
    </>
  );
};

export default Stage;
