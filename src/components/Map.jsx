import { useRef, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { randomMap, renderMap } from "../utils/map";
import { randomCourse, renderCourse } from "../utils/course";
import CanvasContainer from "./CanvasContainer";
import MapArea from "./MapArea";

const terrains = [
  {
    color: "#FDBF4F",
    level: 0.8,
    runability: 0.9,
  },
  {
    color: "#ffffff",
    level: 0.5,
    runability: 0.8,
  },
  {
    color: "#A1D3A4",
    level: 0.45,
    runability: 0.1,
  },
  {
    color: "#32B457",
    level: 0.35,
    runability: 0.001,
  },
];

const Map = ({ location, width, height, reload }) => {
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawMap = (canvas, context) => {
      const map = randomMap(
        width,
        height,
        terrains,
        location.vegetations,
        location.heights
      );
      const course = randomCourse(width, height, 11, map);
      renderMap(map, context, canvas);
      renderCourse(course, context);
      setLoading(false);
    };
    setLoading(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setTimeout(() => drawMap(canvas, context), 0);
  }, [location, reload, width, height]);

  return (
    <MapArea>
      <CanvasContainer width={width + width / 20} height={height + width / 20}>
        {loading && <Spinner animation="border" />}
        <canvas
          width={width}
          height={height}
          ref={canvasRef}
          style={{
            display: loading ? "none" : "block",
            border: "2px solid #32b457",
            borderRadius: "5px",
          }}
        />
      </CanvasContainer>
    </MapArea>
  );
};

export default Map;
