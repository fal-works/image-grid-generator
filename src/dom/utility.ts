import p5 from "p5";
import { Position, RectangleSize } from "../common/types";
import { fitToBox as fitSize } from "../common/fit-to-box";

export const getSize = (element: p5.Element) =>
  element.size() as {
    width: number;
    height: number;
  };

export const fitToBox = (element: p5.Element, boxSize: RectangleSize) => {
  const newSize = fitSize(getSize(element), boxSize);
  element.size(newSize.width, newSize.height);
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
  const htmlElement: HTMLElement = element.elt;
  const style = htmlElement.style;
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
