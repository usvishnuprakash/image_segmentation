import React, { useContext } from "react";
import { Stage } from "react-konva";
import AppContext from "./hooks/createContext";

const Canvas = () => {
  const {
    image: [image],
  } = useContext(AppContext)!;

  if (!image) return null;

  //   const canvasDimensions = {
  //     width: Math.floor(w.canvasScale),
  //   };

  return (
    <div>
      <div>
        <img src={image?.src} alt="" />
        <Stage
          className="konva"
          width={400}
          height={600}
          onMouseDown={() => {}}
          onMouseUp={() => {}}
          onMouseMove={() => {}}
          
          ></Stage>
      </div>
    </div>
  );
};

export default Canvas;
