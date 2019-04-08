/**
 * Oxnan: double pendulum with random colours
 *
 * Equations by Erik Neumann
 * https://www.myphysicslab.com/pendulum/double-pendulum-en.html
 * inspiration
 * https://www.youtube.com/watch?v=uWzPe_S-RVE (Coding Challenge #93: Double Pendulum)
 */
const canvas = 1080;

let r1;
let r2;
let m1;
let m2;
let a1 = 0;
let a2 = 0;
let a1vel = 0;
let a2vel = 0;
const g = 1;

let px2 = 0;
let py2 = 0;
let cx;
let cy;
let buffer;
let colours = [];
const random_bool1 = (Math.random() >= 0.5);
const random_bool2 = (Math.random() >= 0.5);
const random_bool3 = (Math.random() >= 0.5);


// Setup
function setup() {
  createCanvas(canvas, canvas);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(1);

  // Values are slightly random, meaning every viewing is slightly different
  r1 = random(190, 200);
  r2 = random(260, 240);
  m1 = random(18, 26);
  m2 = random(30, 41);

  // Starting angles
  a1 = PI / random();
  a2 = PI / random();

  cx = width / 2;
  cy = height * 0.40;

  colours = [
    color(229, 252, 255, 0.3),
    color(26, 45, 80),

    color(122, 79, 242, 0.7),
    color(230, 9, 116, 0.7),

    color(74, 247, 144, 0.7),
    color(245, 0, 0, 0.7),

    color(250, 250, 0, 0.7),
    color(245, 38, 0, 0.7),

    color(0, 250, 239, 0.7),
    color(245, 0, 233, 0.7),

    color(241, 255, 31, 0.7),
    color(73, 235, 84, 0.7),

    color(255, 207, 133, 0.7),
    color(232, 123, 141, 0.7),

    color(255, 218, 63, 0.7),
    color(232, 134, 123, 0.7),

    color(173, 148, 255, 0.7),
    color(123, 232, 207, 0.7),

    color(123, 205, 232, 0.7),
    color(232, 123, 182, 0.7),
  ];

  // Create graphic
  buffer = createGraphics(width, height);
  buffer.background(colours[1]);
  buffer.translate(cx, cy);

}

// Draw tick
function draw() {
  background(colours[1]);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  // Double pendulum equation
  // Arm one
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2vel * a2vel * r2 + a1vel * a1vel * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  const a1acc = (num1 + num2 + num3 * num4) / den;
  // Arm two
  num1 = 2 * sin(a1 - a2);
  num2 = (a1vel * a1vel * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2vel * a2vel * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  const a2acc = (num1 * (num2 + num3 + num4)) / den;

  // Add acceleration
  a1vel += a1acc;
  a2vel += a2acc;
  a1 += a1vel;
  a2 += a2vel;

  // Calculate pixel positions
  const x1 = r1 * sin(a1);
  const y1 = r1 * cos(a1);
  const x2 = x1 + (r2 * sin(a2));
  const y2 = y1 + (r2 * cos(a2));

  // Draw pendulum.
  translate(cx, cy);
  stroke(colours[0]);
  strokeWeight(1);
  // Arm one
  line(0, 0, x1, y1);
  fill(colours[0]);
  ellipse(x1, y1, (m1 / 2), (m1 / 2));
  // Arm two
  line(x1, y1, x2, y2);
  fill(colours[0]);
  ellipse(x2, y2, (m2 / 2), (m2 / 2));
  // Draw trail
  if (frameCount > 1 && random_bool1 && !random_bool2 &&random_bool3) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[2], colours[3], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
  }

  if (frameCount > 1 && !random_bool1 && random_bool2 && random_bool3) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[4], colours[5], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
  }

  if (frameCount > 1 && random_bool1 && random_bool2 && random_bool3) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[6], colours[7], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);

  }

  if (frameCount > 1 && !random_bool1 && !random_bool2&& random_bool3) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[8], colours[9], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
  }

  if (frameCount > 1 && random_bool1 && !random_bool2 &&!random_bool3) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[10], colours[11], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
  }

  if (frameCount > 1 && !random_bool1 && random_bool2 && !random_bool3) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[12], colours[13], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
  }

  if (frameCount > 1 && random_bool1 && random_bool2 && !random_bool3) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[14], colours[15], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);

  }

  if (frameCount > 1 && !random_bool1 && !random_bool2&& !random_bool3) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[16], colours[17], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
    buffer.line(px1, py1, x1, y1);
  }
  // Set previous position (used above for line)
  py2 = y2;
  px2 = x2;
  py1 = y1;
  px1 = x1;
}
