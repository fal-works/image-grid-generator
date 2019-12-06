import p5 from "p5";
import { p } from "./shared";
import * as Parameters from "./parameters";

export const create = (
  images: readonly p5.Image[] | readonly p5.Element[],
  parameters: Parameters.Unit
) => {
  const {
    width: graphicsWidth,
    height: graphicsHeight,
    rows,
    columns,
    outerMargin
  } = parameters;
  const imageCount = images.length;

  const cellWidth =
    (graphicsWidth - outerMargin.left - outerMargin.right) / columns;
  const cellHeight =
    (graphicsHeight - outerMargin.top - outerMargin.bottom) / rows;

  let imageIndex = 0;

  const graphics = p.createGraphics(graphicsWidth, graphicsHeight);
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
      const imageWidth = (image as any).width as number;
      const imageHeight = (image as any).height as number;
      const scaleFactor = Math.min(
        cellWidth / imageWidth,
        cellHeight / imageHeight
      );
      graphics.image(
        image,
        x,
        y,
        scaleFactor * imageWidth,
        scaleFactor * imageHeight
      );
    }
  }

  graphics.pop();

  return graphics;
};
