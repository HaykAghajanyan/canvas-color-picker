import { changeSVGColor, rgbToHex } from './src/helpers/color';
import { drawActiveRect, drawColorLabel, drawGrid } from './src/helpers/drawers';

const GRID_RATIO = 20;
const ZOOM_LEVEL = 3;

let isPickerMode = false;

const hex = document.getElementById('hex');
const img = document.getElementById('image');
const circle = document.getElementById('circle');
const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('color-picker');

const ctx = canvas.getContext("2d", { willReadFrequently: true });

const circleWidth = circle.width.animVal.value;

const zoomSize = circleWidth;
const zoomRectSize = (circleWidth - GRID_RATIO) / GRID_RATIO;
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

const imageWidthShrinkRatio = img.width / vw;
const imageHeightShrinkRatio = img.height / vh;

img.width = vw;
img.height = vh;

canvas.width = vw;
canvas.height = vh;


const zoomOnMouseMove = e => {
  const { offsetX, offsetY } = e;

  const circleX = offsetX - circleWidth / 2;
  const circleY = offsetY - circleWidth / 2;

  circle.style.left = `${circleX}px`;
  circle.style.top = `${circleY}px`;
  circle.style.display = 'block';

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sx = offsetX * imageWidthShrinkRatio - zoomSize / (2 * ZOOM_LEVEL);
  const sy = offsetY * imageHeightShrinkRatio - zoomSize / (2 * ZOOM_LEVEL);
  const sw = zoomSize / ZOOM_LEVEL;
  const sh = zoomSize / ZOOM_LEVEL;

  const dx = offsetX - zoomSize / 2;
  const dy = offsetY - zoomSize / 2;
  const dw = zoomSize;
  const dh = zoomSize;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.save();

  ctx.beginPath();
  ctx.arc(
    offsetX,
    offsetY,
    circleWidth / 2,
    0,
    Math.PI * 2
  );
  ctx.clip();

  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  ctx.restore();

  const imageData = ctx.getImageData(offsetX, offsetY, 1, 1).data;
  const hexColor = rgbToHex(imageData[0], imageData[1], imageData[2]);

  changeSVGColor(hexColor);

  drawGrid(ctx, dx, dy, circleWidth, zoomRectSize);
  drawActiveRect(ctx, dx, dy, circleWidth, zoomRectSize);
  drawColorLabel(ctx, dx, dy, hexColor, circleWidth);
};

const getColorOnClick = e => {
  const { offsetX, offsetY } = e;

  const imageData = ctx.getImageData(offsetX, offsetY, 1, 1).data;
  hex.innerHTML = `Picked color: ${rgbToHex(imageData[0], imageData[1], imageData[2])}`;
};

const onColorPickerClick = () => {
  if (isPickerMode) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    img.style.cursor = 'default';
    circle.style.display = 'none';
    img.removeEventListener("mousemove", zoomOnMouseMove);
    img.removeEventListener('click', getColorOnClick);
  } else {
    img.style.cursor = 'none';
    img.addEventListener("mousemove", zoomOnMouseMove);
    img.addEventListener('click', getColorOnClick);
  }

  isPickerMode = !isPickerMode;
};

colorPicker.addEventListener('click', onColorPickerClick);


