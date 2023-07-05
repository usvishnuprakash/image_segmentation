import React, { Profiler, useState } from "react";
import Canvas from "./Canvas";

const NewStage = () => {
  // const [newAnnotation, setNewAnnotation] = useState<Array<Array>>([]);
  const handleMouseDown = (e: any) => {
    const { x, y } = e.target.getStage().getPointerPosition();
  };

  return (
    <Profiler id="canvas" onRender={() => {}}>
      <Canvas />
    </Profiler>
  );
};

export default NewStage;
