import p5 from "p5";
import { p } from "./shared";

export const create = (onDrop: (file: p5.File) => void) => {
  const dropzone = p.createDiv();
  dropzone.position(0, 0);
  dropzone.size(p.width, p.height / 2);

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
