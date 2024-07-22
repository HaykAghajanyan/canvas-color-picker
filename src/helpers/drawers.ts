import {ColorValueHex, DrawParams} from "./types";

const ACTIVE_RECT_COLOR: ColorValueHex = '#DFE5DA';
const COLOR_LABEL_COLOR: ColorValueHex = '#818589';
const GRID_LINES_COLOR: ColorValueHex = '#00000080';

export const drawGrid = ({ctx, x, y, circleWidth, zoomRectSize}: DrawParams): void => {
  const circleRadius = circleWidth / 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(x + circleRadius, y + circleRadius, circleRadius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  ctx.strokeStyle = GRID_LINES_COLOR;
  ctx.lineWidth = 0.5;

  for (let i = x; i < x + circleWidth; i += zoomRectSize) {
    ctx.beginPath();
    ctx.moveTo(i, y);
    ctx.lineTo(i, y + circleWidth);
    ctx.stroke();
  }

  for (let j = y; j < y + circleWidth; j += zoomRectSize) {
    ctx.beginPath();
    ctx.moveTo(x, j);
    ctx.lineTo(x + circleWidth, j);
    ctx.stroke();
  }

  ctx.restore();
};

export const drawRoundedRect = ({ctx, x, y, width, height, radius}: DrawParams): void => {
  ctx.fillStyle = COLOR_LABEL_COLOR;
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
};

export const drawActiveRect = ({ctx, x, y, circleWidth, zoomRectSize}: DrawParams): void => {
  const RectX = (x + circleWidth / 2) - zoomRectSize / 2;
  const RectY = (y + circleWidth / 2) - zoomRectSize / 2;

  ctx.strokeStyle = ACTIVE_RECT_COLOR;
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(RectX, RectY);
  ctx.lineTo(RectX + zoomRectSize, RectY);
  ctx.lineTo(RectX + zoomRectSize, RectY + zoomRectSize);
  ctx.lineTo(RectX, RectY + zoomRectSize);
  ctx.lineTo(RectX, RectY);
  ctx.closePath();
  ctx.stroke();
};

export const drawColorLabel = ({ctx, x, y, color, circleWidth, font = "11px Arial"}: DrawParams): void => {
  const labelX = x + circleWidth / 3;
  const labelY = y + circleWidth / 1.8;

  drawRoundedRect({
    ctx,
    x: labelX,
    y: labelY,
    width: circleWidth / 3,
    height: 20,
    radius: 5,
  });

  ctx.font = font;
  ctx.fillStyle = ACTIVE_RECT_COLOR;

  ctx.fillText(color, labelX + 2, labelY + 14);
};
