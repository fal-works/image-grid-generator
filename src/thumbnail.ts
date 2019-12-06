import p5 from "p5";
import * as DomUtility from "./dom-utility";
import * as ImgElement from "./img-element";
import { CANVAS_SIZE } from "./settings";

export let currentRegisteredCount = 0;
const columns = 10;
const boxSize = {
  width: CANVAS_SIZE.width / columns,
  height: CANVAS_SIZE.height / columns
};
const offsetY = 30;

const onLoad = (thumbnail: p5.Element) => {
  const index = currentRegisteredCount++;
  const row = Math.floor(index / columns);
  const column = index % columns;
  const boxPosition = {
    x: boxSize.width * column,
    y: boxSize.height * row + offsetY
  };
  DomUtility.setInBox(thumbnail, boxPosition, boxSize);
};

export const add = (
  file: p5.File,
  onComplete: (img: p5.Element, file: p5.File) => void
) => {
  if (file.type !== "image") {
    console.warn(`Dropped file that is not an image:`, file);
    return;
  }

  ImgElement.create({
    file,
    alt: file.name,
    onLoad: (img, file) => {
      onLoad(img);
      onComplete(img, file);
    }
  });
};
