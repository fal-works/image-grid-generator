import { p } from "../common/shared";
import * as Parameters from "../parameters";
import { getScaleFactorToShrink } from "../common/fit-to-box";

export const draw = (parameters: Parameters.Unit): void => {
  const { width, height, columns, rows, innerMargin } = parameters;

  const {
    contentWidth,
    contentHeight,
    contentLeftX,
    contentTopY,
    contentRightX,
    contentBottomY,
    columnWidth,
    rowHeight,
    cellWidth,
    cellHeight,
  } = Parameters.calculate(parameters);

  p.push();
  p.translate(p.width / 2, p.height / 2);
  const scaleFactor = getScaleFactorToShrink(parameters, p);
  p.scale(scaleFactor);
  p.strokeWeight(1 / scaleFactor);
  p.translate(-width / 2, -height / 2);
  p.stroke(255, 64, 128);
  p.noFill();

  p.rect(1, 1, width - 2, height - 2);
  p.rect(
    contentLeftX + 1,
    contentTopY + 1,
    contentWidth - 2,
    contentHeight - 2
  );

  if (innerMargin === 0) {
    for (let i = 1, x = contentLeftX; i < columns; i += 1) {
      x += columnWidth;
      p.line(x, contentTopY, x, contentBottomY);
    }
    for (let i = 1, y = contentTopY; i < rows; i += 1) {
      y += rowHeight;
      p.line(contentLeftX, y, contentRightX, y);
    }
  } else {
    for (let i = 1, x = contentLeftX; i < columns; i += 1) {
      x += cellWidth;
      p.line(x, contentTopY, x, contentBottomY);
      x += innerMargin;
      p.line(x, contentTopY, x, contentBottomY);
    }
    for (let i = 1, y = contentTopY; i < rows; i += 1) {
      y += cellHeight;
      p.line(contentLeftX, y, contentRightX, y);
      y += innerMargin;
      p.line(contentLeftX, y, contentRightX, y);
    }
  }

  p.pop();
};
