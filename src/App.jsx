// App.js

import React, { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [isDel, setIsDel] = useState(false);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);
  const [lineDash, setLineDash] = useState([]); // State for line dash style

  // Initialization when the component mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "butt";
    ctx.lineJoin = "square";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(lineDash); // Apply line dash style
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth, lineDash]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    const ctx = ctxRef.current;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (isDel) {
      ctx.clearRect(x, y, 10, 10); // Clear a small portion of the canvas
      return;
    }

    if (isDrawing) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  return (
    <div className="App">
      <h1>Sketcher</h1>

      <div className="draw-area">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          setLineDash={setLineDash} // Pass setLineDash function as prop
          setIsDel={setIsDel}
          ctxRef={ctxRef.current}
          canvasRef={canvasRef.current}
        />

        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={1280} // Pass width as number
          height={720} // Pass height as number
        />
      </div>
    </div>
  );
}

export default App;
