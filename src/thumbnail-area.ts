import p5 from "p5";
import * as DomUtility from "./dom-utility";
import * as ImgElement from "./img-element";

export interface Unit {
  readonly position: { x: number; y: number };
  readonly width: number;
  readonly columns: number;
  readonly cellSize: { width: number; height: number };
  registeredCount: number;
}

export const create = (parameters: {
  position: { x: number; y: number };
  width: number;
  columns: number;
}): Unit => {
  const { position, width, columns } = parameters;
  const cellWidth = width / columns;

  return {
    position,
    width,
    columns,
    cellSize: { width: cellWidth, height: cellWidth },
    registeredCount: 0
  };
};

const onLoad = (area: Unit, thumbnail: p5.Element) => {
  const index = area.registeredCount++;

  const { position: areaPosition, columns, cellSize } = area;

  const row = Math.floor(index / columns);
  const column = index % columns;
  const boxPosition = {
    x: areaPosition.x + cellSize.width * column,
    y: areaPosition.y + cellSize.height * row
  };
  DomUtility.setInBox(thumbnail, boxPosition, cellSize);
};

export const add = (
  area: Unit,
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
      onLoad(area, img);
      onComplete(img, file);
    }
  });
};
