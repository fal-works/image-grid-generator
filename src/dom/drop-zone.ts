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

  const dropZone = p.createDiv("Drop image files here");

  const highlight = () => dropZone.style("background-color", "#F0FAFF");
  const unhighlight = () => dropZone.style("background-color", "#FDFDFD");

  setPosition(dropZone, position).size(size.width, size.height);

  dropZone.addClass("drop-zone");

  dropZone
    .dragOver(highlight)
    .dragLeave(unhighlight)
    .drop(onDrop, () => {
      unhighlight();
      dropZone.elt.innerHTML = "";
    });

  unhighlight();

  return dropZone;
};
