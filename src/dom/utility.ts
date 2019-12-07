import p5 from "p5";
import { Position, RectangleSize } from "../common/types";

export const getSize = (element: p5.Element) =>
  element.size() as {
    width: number;
    height: number;
  };

export const fitToBox = (element: p5.Element, boxSize: RectangleSize) => {
  const { width, height } = getSize(element);
  const scaleFactor = Math.min(boxSize.width / width, boxSize.height / height);
  element.size(width * scaleFactor, height * scaleFactor);
};

type PositionType = "static" | "absolute" | "relative" | "fixed";
const positionTypes = {
  static: "static" as PositionType,
  absolute: "absolute" as PositionType,
  relative: "relative" as PositionType,
  fixed: "fixed" as PositionType
};

export const setPosition = (
  element: p5.Element,
  position: Position,
  type: PositionType = positionTypes.absolute
) => {
  const style = element.elt.style;
  const { x, y } = position;

  style.position = type;
  style.left = `${x}px`;
  style.top = `${y}px`;

  return element;
};

export const setInBox = (
  element: p5.Element,
  boxPosition: Position,
  boxSize: RectangleSize
) => {
  fitToBox(element, boxSize);

  const size = getSize(element);
  setPosition(element, {
    x: boxPosition.x + (boxSize.width - size.width) / 2,
    y: boxPosition.y + (boxSize.height - size.height) / 2
  });
};
