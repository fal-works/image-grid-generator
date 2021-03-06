import p5 from "p5";
import { p } from "../common/shared";
import { Position, RectangleSize } from "../common/types";
import { setPosition } from "./utility";

export const create = (parameters: {
  position: Position;
  size: RectangleSize;
  onDrop: (file: p5.File) => void;
}): p5.Element => {
  const { position, size, onDrop } = parameters;

  const dropZone = p.createDiv("Drop image files here");

  const onDragOver = () => {
    dropZone.style("background-color", "#F0FAFF");
    dropZone.style("cursor", "wait");
  };
  const onDragLeave = () => {
    dropZone.style("background-color", "#FDFDFD");
    dropZone.style("cursor", "auto");
  };

  setPosition(dropZone, position).size(size.width, size.height);

  dropZone.addClass("drop-zone");

  const divElement: HTMLDivElement = dropZone.elt;
  dropZone
    .dragOver(onDragOver)
    .dragLeave(onDragLeave)
    .drop(onDrop, () => {
      onDragLeave();
      divElement.innerHTML = "";
    });

  onDragLeave();

  return dropZone;
};
