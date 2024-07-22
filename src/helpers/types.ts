export type ColorValueHex = `#${string}`;

export interface DrawParams {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  circleWidth?: number;
  zoomRectSize?: number;
  width?: number;
  height?: number;
  radius?: number;
  color?: string;
  font?: string;
}
