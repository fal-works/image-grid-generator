import { p } from "../shared";

export const create = (parameters: {
  label: string;
  onClick: () => void;
  position: { x: number; y: number };
  size: { width: number; height: number };
}) => {
  const { label, onClick, position, size } = parameters;

  const button = p.createButton(label);
  button.mouseClicked(onClick);
  button.position(position.x, position.y);
  button.size(size.width, size.height);

  return button;
};
