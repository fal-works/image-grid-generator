import p5 from "p5";
import { p } from "./shared";
import { RectangleSize } from "./types";

export const create = (parameters: {
  images: readonly p5.Image[] | readonly p5.Element[];
  rows: number;
  columns: number;
  wholeSize: RectangleSize;
}) => {
  const { images, rows, columns, wholeSize } = parameters;
  const imageCount = images.length;

  const cellWidth = wholeSize.width / columns;
  const cellHeight = wholeSize.height / rows;
  let imageIndex = 0;

  const graphics = p.createGraphics(wholeSize.width, wholeSize.height);
  graphics.push();
  graphics.imageMode(p.CENTER);
  graphics.translate(cellWidth / 2, cellHeight / 2);

  for (let row = 0; row < rows; row += 1) {
    const y = row * cellHeight;

    for (let column = 0; column < columns; column += 1) {
      if (imageIndex >= imageCount) break;
      const x = column * cellWidth;

      const image = images[imageIndex++];
      graphics.image(image, x, y, cellWidth, cellHeight);
    }
  }

  graphics.pop();

  return graphics;
};
