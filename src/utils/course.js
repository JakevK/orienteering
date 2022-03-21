const simulatedAnnealing = (controls) => {
  let temperature = 1000;
  while (temperature > 0.1) {
    for (let n = 0; n < 100; n++) {
      const i = parseInt(Math.random() * (controls.length - 2)) + 1;
      const j = parseInt(Math.random() * (controls.length - i)) + i;

      const costDiff =
        controlDistance(controls[i], cyclicIndex(controls, i - 1)) +
        controlDistance(controls[j], cyclicIndex(controls, j + 1)) -
        (controlDistance(controls[i], cyclicIndex(controls, j + 1)) +
          controlDistance(controls[j], cyclicIndex(controls, i - 1)));

      if (
        costDiff >= 0 ||
        Math.random() <= Math.E ** (costDiff / temperature)
      ) {
        let section = controls.splice(i, j - i + 1);
        controls.splice(i, 0, ...section.reverse());
      }
    }
    temperature = temperature * 0.99;
  }
  return controls;
};
const twoOpt = (controls) => {
  while (true) {
    let improved = false;

    for (let i = 0; i < controls.length - 2; i++) {
      for (let j = i + 1; j < controls.length - 1; j++) {
        let currDistance =
          controlDistance(controls[i], cyclicIndex(controls, i - 1)) +
          controlDistance(controls[j], cyclicIndex(controls, j + 1));
        let newDistance =
          controlDistance(controls[i], cyclicIndex(controls, j + 1)) +
          controlDistance(controls[j], cyclicIndex(controls, i - 1));

        if (newDistance < currDistance) {
          let section = controls.splice(i, j - i + 1);
          controls.splice(i, 0, ...section.reverse());
          improved = true;
        }
      }
    }

    if (!improved) return controls;
  }
};

const trianglePath = (control, path, offsetAngle, radius = 20) => {
  path.strokeStyle = "#C5168C";
  path.lineWidth = 2;
  radius = radius * 1.4;
  const cornerCoords = (radius, cornerIndex) => {
    const angle =
      (1 / 3) * (2 * Math.PI) * cornerIndex + Math.PI / 6 - offsetAngle; //+ offsetAngle;
    return [
      radius * Math.cos(angle) + control.x,
      radius * Math.sin(angle) + control.y,
    ];
  };
  path.moveTo(...cornerCoords(radius, 0));
  [1, 2, 0].map((n) => path.lineTo(...cornerCoords(radius, n)));
};
const controlPath = (x, y) => {
  return (control, angle = 0) => {
    const path = new Path2D();
    const type = control.type;
    if (type === "normal" || type === "finish") {
      path.arc(x, y, 20, 0, 2 * Math.PI);
    }
    if (type === "finish") {
      path.arc(x, y, 16, 0, 2 * Math.PI);
    } else if (type === "start") {
      trianglePath(control, path, angle);
    }
    return path;
  };
};
const newControl = (x, y) => ({
  type: "normal",
  x: x,
  y: y,
  path: controlPath(x, y),
});
const randomControl = (width, height) =>
  newControl(Math.random() * width, Math.random() * height);

const controlInWater = (control, map, width, height) =>
  map[Math.floor((control.x / width) * map.length)][
    Math.floor((control.y / height) * map[0].length)
  ].terrain === "water";

const controlOnEdge = (control, width, height) =>
  control.x <= 40 ||
  control.x >= width - 40 ||
  control.y <= 40 ||
  control.y >= height - 40;

const controlCollision = (control1, control2) =>
  ["x", "y"].filter(
    (a) => control1[a] >= control2[a] - 50 && control1[a] <= control2[a] + 50
  ).length > 1;

const controlCollisionExists = (control, controls) =>
  controls.filter((control1) => controlCollision(control, control1)).length;

const validControl = (control, controls, map, width, height) =>
  !controlInWater(control, map, width, height) &&
  !controlCollisionExists(control, controls) &&
  !controlOnEdge(control, width, height);

const controlDistance = (a, b) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const cyclicIndex = (array, i) => {
  i = i % array.length;
  if (i < 0) i += array.length;
  return array[i];
};

const courseWithStartAndFinish = (controls) => [
  { ...controls[0], type: "start" },
  ...controls.splice(1, controls.length - 2),
  { ...controls[controls.length - 1], type: "finish" },
];

const randomCourse = (width, height, length, map) => {
  let controls = [];
  for (let i = 0; i < length - 1; i++) {
    for (let i = 0; i < 1000; i++) {
      const control = randomControl(width, height);
      if (validControl(control, controls, map, width, height)) {
        controls.push(control);
        break;
      }
    }
  }
  return courseWithStartAndFinish(twoOpt(simulatedAnnealing(controls)));
};

const renderLeg = (control1, control2, context, r = 20) => {
  const x = control2.x - control1.x;
  const y = control2.y - control1.y;

  let angle1 = Math.atan(y / x);
  let angle2 = Math.PI / 2 - angle1;

  const s = x < 0 ? -1 : 1;

  const r2 = r;
  const r1 = control1.type === "start" ? r * 1.3 : r;

  const x1 = r1 * Math.cos(angle1) * s;
  const y1 = r1 * Math.sin(angle1) * s;
  const x2 = r2 * Math.sin(angle2) * s;
  const y2 = r2 * Math.cos(angle2) * s;

  context.strokeStyle = "#C5168C";
  context.beginPath();
  context.moveTo(control1.x + x1, control1.y + y1);
  context.lineTo(control2.x - x2, control2.y - y2);
  context.stroke();
};

const renderControl = (control, context, angle) => {
  context.strokeStyle = "#C5168C";
  context.lineWidth = 2;
  context.beginPath();
  context.stroke(control.path(control, angle));
  context.stroke();
};

/*const renderInnerCircle = (control, context, radius = 20) =>
  renderControl(control, context, radius * 0.8);
  */

const vectorAngle = (x, y) => Math.atan(x / y) + (y < 0 ? 0 : Math.PI);

const renderCourse = (course, context) =>
  course.map((control, i, course) => {
    if (i) renderLeg(course[i - 1], control, context);
    renderControl(
      control,
      context,
      i
        ? 0
        : vectorAngle(course[i + 1].x - control.x, course[i + 1].y - control.y)
    );
    return 1;
  });

export { randomCourse, renderCourse };
