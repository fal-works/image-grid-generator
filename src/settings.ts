import { Position, RectangleSize } from "./types";

const wholeSize: RectangleSize = {
  width: 1280,
  height: 800
};

export const leftZonePosition: Position = {
  x: 0,
  y: 0
};

export const leftZoneSize: RectangleSize = {
  width: wholeSize.width - wholeSize.height,
  height: wholeSize.height
};

const leftZoneRightPadding = 20;

const leftZoneInterval = 10;

// -- drop zone ----

export const dropZonePosition: Position = {
  x: leftZonePosition.x,
  y: leftZonePosition.y
};

export const dropZoneSize: RectangleSize = {
  width: leftZoneSize.width - leftZoneRightPadding,
  height: 420
};

// -- buttons ----

export const generateButtonPosition: Position = {
  x: leftZonePosition.x,
  y: dropZonePosition.y + dropZoneSize.height + leftZoneInterval
};

const buttonHeight = 30;
const buttonHorizontalInterval = 20;

export const generateButtonSize: RectangleSize = {
  width: 120,
  height: buttonHeight
};

export const saveButtonPosition: Position = {
  x:
    generateButtonPosition.x +
    buttonHorizontalInterval +
    generateButtonSize.width,
  y: generateButtonPosition.y
};

export const saveButtonSize: RectangleSize = {
  width: 80,
  height: buttonHeight
};

// -- parameter area ----

export const parameterAreaPosition: Position = {
  x: leftZonePosition.x,
  y: generateButtonPosition.y + buttonHeight + leftZoneInterval
};

export const parameterAreaSize: RectangleSize = {
  width: leftZoneSize.width - leftZoneRightPadding,
  height:
    leftZoneSize.height -
    (dropZoneSize.height + leftZoneInterval + buttonHeight + leftZoneInterval)
};

// -- canvas ----

export const canvasSize: RectangleSize = {
  width: wholeSize.width - leftZoneSize.width,
  height: wholeSize.height
};

export const canvasPosition: Position = {
  x: leftZoneSize.width,
  y: 0
};
