// Menu.js

import React from "react";
import "./App.css";
import jsPDF from "jspdf"; // Import jsPDF library
const Menu = ({
  setLineColor,
  setLineWidth,
  setLineOpacity,
  setLineDash,
  setIsDel,
  ctxRef,
  canvasRef,
}) => {
   const [downloadFormat, setDownloadFormat] = React.useState("jpeg");
  const [lineDashOption, setLineDashOption] = React.useState("solid");

  const handleLineDashChange = (option) => {
    if (option === "solid") {
      setLineDash([]);
    } else if (option === "dotted") {
      setLineDash([1, 3]);
    } else if (option === "dashed") {
      setLineDash([5, 5]);
    }
    setLineDashOption(option);
  };
  function handleClearCanvas() {
    ctxRef.clearRect(
      0,
      0,
      canvasRef.width,
      canvasRef.height,
    );
  }

  function handleDownload() {
    const date = new Date().toLocaleString();
    let filename = `drawing-${date}`;

    if (downloadFormat === 'jpeg' || downloadFormat === 'png') {
      filename += `.${downloadFormat}`;
      const a = document.createElement('a');
      a.href = canvasRef.toDataURL(`image/${downloadFormat}`);
      a.download = filename;
      a.click();
    } else if (downloadFormat === 'pdf') {
      const pdf = new jsPDF();
      const imgData = canvasRef.toDataURL('image/png');

      // Add image to PDF document
      pdf.addImage(imgData, 'PNG', 10, 10,  150,250);
      // Apply basic styling to PDF document
      pdf.setFontSize(16);
      pdf.setTextColor(255, 0,0);
      pdf.text(filename, 10, 280);

      // Save or open PDF document
      pdf.save(`${filename}.pdf`);
    }
  }
  return (
    <div className="menu">
      <label>Brush Color</label>
      <input
        type="color"
        onChange={(e) => setLineColor(e.target.value)}
      />
      <label>Brush Width</label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => setLineWidth(e.target.value)}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e) => setLineOpacity(e.target.value / 100)}
      />
      <button onClick={handleClearCanvas}>
        <img src="clear-icon.png" alt="Clear Canvas" />
      </button>
      <select value={downloadFormat} onChange={(e) => setDownloadFormat(e.target.value)}>
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="pdf">PDF</option>
      </select>
      <button onClick={handleDownload}>
        <img src="download-icon.png" alt="Download Drawing" />
      </button>
      <select
        value={lineDashOption}
        onChange={(e) => handleLineDashChange(e.target.value)}
      >
        <option value="solid">Solid</option>
        <option value="dotted">Dotted</option>
        <option value="dashed">Dashed</option>
      </select>

      <button onClick={() => setIsDel(prev => !prev)}>
        <img src="eraser.jpeg" alt="Toggle Eraser Mode" />
      </button>
    </div>
  );
};

export default Menu;
