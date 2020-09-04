import { p } from "../common/shared";
import { Position, RectangleSize } from "../common/types";
import { setPosition } from "./utility";
import p5 from "p5";

export const create = (parameters: {
  readonly position: Position;
  readonly size: RectangleSize;
  readonly initialValue?: string;
}): p5.Element => {
  const { position, size, initialValue } = parameters;

  const area = p.createElement("textarea", initialValue);

  setPosition(area, position).size(size.width, size.height);

  return area;
};
