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

  const { columnWidth, rowHeight } = Parameters.calculate(parameters);

  let imageIndex = 0;

  const graphics = p.createGraphics(graphicsWidth, graphicsHeight);
  graphics.push();
  graphics.imageMode(p.CENTER);
  graphics.translate(
    outerMargin.left + columnWidth / 2,
    outerMargin.top + rowHeight / 2
  );

  for (let row = 0; row < rows; row += 1) {
    const y = row * rowHeight;

    for (let column = 0; column < columns; column += 1) {
      if (imageIndex >= imageCount) break;
      const x = column * columnWidth;

      const image = images[imageIndex++];
      const imageWidth = (image as any).width as number;
      const imageHeight = (image as any).height as number;
      const scaleFactor = Math.min(
        columnWidth / imageWidth,
        rowHeight / imageHeight
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
