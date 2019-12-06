import p5 from "p5";
import { Position, RectangleSize } from "../types";

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

export const setInBox = (
  element: p5.Element,
  boxPosition: Position,
  boxSize: RectangleSize
) => {
  fitToBox(element, boxSize);

  const size = getSize(element);
  element.position(
    boxPosition.x + (boxSize.width - size.width) / 2,
    boxPosition.y + (boxSize.height - size.height) / 2
  );
};
