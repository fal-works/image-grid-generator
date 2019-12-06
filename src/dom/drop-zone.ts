import p5 from "p5";
import { p } from "../shared";
import { Position, RectangleSize } from "../types";
import { setPosition } from "./utility";

export const create = (parameters: {
  position: Position;
  size: RectangleSize;
  onDrop: (file: p5.File) => void;
}) => {
  const { position, size, onDrop } = parameters;

  const dropzone = p.createDiv();

  const highlight = () => dropzone.style("background-color", "#E0F4FF");
  const unhighlight = () => dropzone.style("background-color", "#FDFDFD");

  setPosition(dropzone, position);
  dropzone.size(size.width, size.height);

  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(onDrop, unhighlight);

  dropzone.style("border-style", "solid");
  dropzone.style("border-color", "#E0E8F0");
  dropzone.style("border-width", "1px");
  unhighlight();

  return dropzone;
};
