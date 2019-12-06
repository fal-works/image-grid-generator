import { p } from "../shared";
import { Position, RectangleSize } from "../types";
import { setPosition } from "./utility";

export const create = (parameters: {
  readonly position: Position;
  readonly size: RectangleSize;
  readonly initialValue?: string;
  readonly fontFamily?: string;
}) => {
  const { position, size, initialValue, fontFamily } = parameters;

  const area = p.createElement("textarea", initialValue);

  setPosition(area, position)
    .size(size.width, size.height)
    .style("color", "#404040")
    .style("padding", "10px")
    .style("box-sizing", "border-box")
    .style("border-color", "#E0E8F0");

  if (fontFamily) area.style("font-family", fontFamily);

  return area;
};
