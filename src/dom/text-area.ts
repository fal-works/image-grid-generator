import { p } from "../shared";
import { Position, RectangleSize } from "../types";
import { setPosition } from "./utility";

export const create = (parameters: {
  readonly position: Position;
  readonly size: RectangleSize;
  readonly initialValue?: string;
}) => {
  const { position, size, initialValue } = parameters;

  const area = p.createElement("textarea", initialValue);
  setPosition(area, position);
  area.size(size.width, size.height);
};
