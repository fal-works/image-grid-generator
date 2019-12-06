import p5 from "p5";
import { p } from "./shared";
import * as Parameters from "./parameters";

export const create = (
  images: readonly p5.Image[] | readonly p5.Element[],
  parameters: Parameters.Unit
) => {
  const { width, height, rows, columns, outerMargin } = parameters;
  const imageCount = images.length;

  const cellWidth = (width - outerMargin.left - outerMargin.right) / columns;
  const cellHeight = (height - outerMargin.top - outerMargin.bottom) / rows;
  let imageIndex = 0;

  const graphics = p.createGraphics(width, height);
  graphics.push();
  graphics.imageMode(p.CENTER);
  graphics.translate(
    outerMargin.left + cellWidth / 2,
    outerMargin.top + cellHeight / 2
  );

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
