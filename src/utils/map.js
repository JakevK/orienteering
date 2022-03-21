import { blankGrid } from "./grid";
import { combinedPerlinNoise, randomUnitVectorGrid } from "./perlin";

const closestTerrain = (vegetationLevel, terrains) =>
  terrains.reduce((prev, curr) =>
    Math.abs(curr.level - vegetationLevel) <
    Math.abs(prev.level - vegetationLevel)
      ? curr
      : prev
  );

const cell = (height, vegetationLevel, terrains) =>
  ((terrain) => ({
    height: height,
    runability: terrain.runability,
    terrain: terrain.name,
    color: terrain.color,
  }))(closestTerrain(vegetationLevel, terrains));

const isKnoll = (x, y, map) =>
  [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ].filter(
    ([a, b]) =>
      map[x + a] &&
      map[x + a][x + b] &&
      map[x + a][x + b].height >= map[x][y].height
  ).length === 0;

const cellWithExtras = (isContour, isWater, x, y, map, cell) => ({
  ...cell,
  runability: isWater ? 0 : cell.runability,
  color: isWater
    ? isWaterEdge(x, y, map)
      ? "#231F20"
      : "#85C3EB"
    : isContour
    ? "#CD7438"
    : cell.color,
  terrain: isWater ? "water" : cell.terrain,
  pointFeature: isKnoll(x, y, map) ? "knoll" : null,
  i: x,
  j: y,
  gScore: Infinity,
});

const newMap = (
  rows,
  columns,
  terrains,
  vegetationFrequencies,
  heightFrequencies,
  vegetationVectorGrid,
  heightVectorGrid
) =>
  blankGrid(rows, columns)
    .map((row, x) =>
      row.map((_cell, y) =>
        cell(
          combinedPerlinNoise(x, y, heightFrequencies, heightVectorGrid),
          combinedPerlinNoise(
            x,
            y,
            vegetationFrequencies,
            vegetationVectorGrid
          ),
          terrains
        )
      )
    )
    .map((row, x, map) =>
      row.map((cell, y) =>
        cellWithExtras(
          isOnContour(map, x, y),
          isWater(map, x, y),
          x,
          y,
          map,
          cell
        )
      )
    );

const randomMap = (
  rows,
  columns,
  terrains,
  vegetationFrequencies,
  heightFrequencies
) =>
  newMap(
    rows,
    columns,
    terrains,
    vegetationFrequencies,
    heightFrequencies,
    randomUnitVectorGrid(
      Math.floor(rows * vegetationFrequencies[0].frequency) + 1,
      Math.floor(columns * vegetationFrequencies[0].frequency) + 1
    ),
    randomUnitVectorGrid(
      Math.floor(rows * heightFrequencies[0].frequency + 1),
      Math.floor(columns * heightFrequencies[0].frequency + 1) + 1
    )
  );

/*const renderPointFeature = (x, y, feature, context) => {
  if (feature === "knoll") {
    context.fillStyle = "#CD7438";
    context.beginPath();
    context.arc(x, y, 3, 0, 3 * Math.PI);
    context.fill();
  }
};*/

const renderCell = (terrain, x, y, context, size) => {
  context.fillStyle = terrain.color;
  context.fillRect(x * size, y * size, size, size);
  //if (cell.pointFeature) renderPointFeature(x, y, cell.pointFeature, context);
};

const isOnContour = (map, x, y, interval = 0.04) =>
  [...Array(Math.floor(1 / interval)).keys()]
    .map((int) => int * interval)
    .filter(
      (height) =>
        map[x][y].height <= height &&
        [
          [-1, 0],
          [0, -1],
          [1, 0],
          [0, 1],
        ].filter(
          ([offsetX, offsetY]) =>
            map[x + offsetX] &&
            map[x + offsetX][y + offsetY] &&
            map[x + offsetX][y + offsetY].height > height
        ).length
    ).length;

const isWater = (map, x, y, threshold = 0.34) => map[x][y].height <= threshold;

const isWaterEdge = (x, y, map, threshold = 0.34) =>
  [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ].filter(
    ([offsetX, offsetY]) =>
      map[x + offsetX] &&
      map[x + offsetX][y + offsetY] &&
      map[x + offsetX][y + offsetY].height > threshold
  ).length;

const renderMap = (map, context, canvas) => {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  map.map((row, x) =>
    row.map((cell, y) =>
      renderCell(cell, x, y, context, canvas.width / map.length)
    )
  );
};

export { randomMap, renderMap };
