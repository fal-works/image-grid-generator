import { Position, RectangleSize } from "./types";

export const canvasSize: RectangleSize = {
  width: 720,
  height: 720
};

export const leftZoneSize: RectangleSize = {
  width: 560,
  height: 720
};

export const dropZoneSize: RectangleSize = {
  width: leftZoneSize.width,
  height: 480
};

export const canvasPosition: Position = {
  x: leftZoneSize.width,
  y: 0
};
