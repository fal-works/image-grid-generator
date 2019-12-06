import { p } from "../shared";
import { Position, RectangleSize } from "../types";

export const create = (parameters: {
  readonly position: Position;
  readonly size: RectangleSize;
  readonly initialValue?: string;
}) => {
  const { position, size, initialValue } = parameters;

  const area = p.createElement("textarea", initialValue);
  area.position(position.x, position.y);
  area.size(size.width, size.height);
};
