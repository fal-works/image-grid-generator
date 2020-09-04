import p5 from "p5";
import { p } from "./common/shared";
import { fitToBox } from "./common/fit-to-box";
import { RectangleSize } from "./common/types";
import * as Parameters from "./parameters";

export const create = (
  images: readonly p5.Image[] | readonly p5.Element[],
  parameters: Parameters.Unit
): p5.Graphics => {
  const {
    width: graphicsWidth,
    height: graphicsHeight,
    rows,
    columns,
    outerMargin,
    innerMargin,
    backgroundColorCode,
  } = parameters;
  const imageCount = images.length;

  const { cellWidth, cellHeight } = Parameters.calculate(parameters);

  const graphics = p.createGraphics(graphicsWidth, graphicsHeight);
  const backgroundColor = p.color(backgroundColorCode);
  if (p.alpha(backgroundColor) > 0) graphics.background(backgroundColor);

  graphics.push();
  graphics.imageMode(p.CENTER);
  graphics.translate(
    outerMargin.left + cellWidth / 2,
    outerMargin.top + cellHeight / 2
  );

  let imageIndex = 0;

  for (
    let row = 0, y = 0;
    row < rows;
    row += 1, y += cellHeight + innerMargin
  ) {
    for (
      let column = 0, x = 0;
      column < columns;
      column += 1, x += cellWidth + innerMargin
    ) {
      if (imageIndex >= imageCount) break;

      const image = images[imageIndex++];
      const displaySize = fitToBox((image as any) as RectangleSize, {
        width: cellWidth,
        height: cellHeight,
      });
      graphics.image(image, x, y, displaySize.width, displaySize.height);
    }
  }

  graphics.pop();

  return graphics;
};
