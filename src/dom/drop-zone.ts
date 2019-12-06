import p5 from "p5";
import { p } from "../shared";
import { Position, RectangleSize } from "../types";
import { setPosition } from "./utility";

export const create = (parameters: {
  position: Position;
  size: RectangleSize;
  onDrop: (file: p5.File) => void;
  fontFamily?: string;
}) => {
  const { position, size, onDrop, fontFamily } = parameters;

  const dropZone = p.createDiv("Drop image files here");

  const highlight = () => dropZone.style("background-color", "#E0F4FF");
  const unhighlight = () => dropZone.style("background-color", "#FDFDFD");

  setPosition(dropZone, position)
    .size(size.width, size.height)
    .style("font-size", "x-large")
    .style("color", "#B0C0D0")
    .style("border-style", "solid")
    .style("border-color", "#E0E8F0")
    .style("border-width", "1px")
    .style("padding", "20px")
    .style("box-sizing", "border-box");

  if (fontFamily) dropZone.style("font-family", fontFamily);

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
