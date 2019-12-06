import { Position, RectangleSize } from "./types";

export const canvasSize: RectangleSize = {
  width: 720,
  height: 720
};

export const leftZonePosition: Position = {
  x: 0,
  y: 60
};

export const leftZoneSize: RectangleSize = {
  width: 560,
  height: 720
};

export const dropZonePosition: Position = {
  x: leftZonePosition.x,
  y: leftZonePosition.y
};

export const dropZoneSize: RectangleSize = {
  width: leftZoneSize.width,
  height: 420
};

export const canvasPosition: Position = {
  x: leftZoneSize.width,
  y: 0
};
