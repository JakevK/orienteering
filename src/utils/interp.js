const lerp = (x, a, b) => a + x * (b - a);
const smootherStep = (x) => 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
const interp = (x, a, b) => lerp(smootherStep(x), a, b);

export { lerp, interp };
