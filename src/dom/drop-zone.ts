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
  setPosition(dropzone, position);
  dropzone.size(size.width, size.height);

  function highlight() {
    dropzone.style("background-color", "#ccc");
  }

  function unhighlight() {
    dropzone.style("background-color", "#fff");
  }

  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(onDrop, unhighlight);

  return dropzone;
};
