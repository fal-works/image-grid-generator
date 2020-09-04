import { p } from "../common/shared";
import { setPosition } from "./utility";
import p5 from "p5";

export const create = (parameters: {
  label: string;
  onClick: () => void;
  position: { x: number; y: number };
  size: { width: number; height: number };
  cursor?: string;
}): p5.Element => {
  const { label, onClick, position, size, cursor } = parameters;

  const button = p.createButton(label);
  button.mouseClicked(onClick);
  setPosition(button, position);
  button.size(size.width, size.height);
  if (cursor) button.style("cursor", cursor);

  return button;
};
