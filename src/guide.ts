import { p } from "./shared";
import * as Parameters from "./parameters";

export const draw = (parameters: Parameters.Unit) => {
  const { width, height, columns, rows, innerMargin } = parameters;

  const {
    contentWidth,
    contentHeight,
    contentLeftX,
    contentTopY,
    contentRightX,
    contentBottomY,
    columnWidth,
    rowHeight
  } = Parameters.calculate(parameters);

  p.push();
  p.translate((p.width - width) / 2, (p.height - height) / 2);
  p.stroke(255, 64, 128);
  p.noFill();

  p.rect(1, 1, width - 2, height - 2);
  p.rect(
    contentLeftX + 1,
    contentTopY + 1,
    contentWidth - 2,
    contentHeight - 2
  );

  if (innerMargin <= 0) {
    for (let i = 1; i < columns; i += 1) {
      const x = contentLeftX + i * columnWidth;
      p.line(x, contentTopY, x, contentBottomY);
    }
    for (let i = 1; i < rows; i += 1) {
      const y = contentTopY + i * rowHeight;
      p.line(contentLeftX, y, contentRightX, y);
    }
  } else {
    const halfInnerMargin = innerMargin / 2;
    for (let i = 1; i < columns; i += 1) {
      const x = contentLeftX + i * columnWidth;
      const leftX = x - halfInnerMargin;
      const rightX = x + halfInnerMargin;
      p.line(leftX, contentTopY, leftX, contentBottomY);
      p.line(rightX, contentTopY, rightX, contentBottomY);
    }
    for (let i = 1; i < rows; i += 1) {
      const y = contentTopY + i * rowHeight;
      const topY = y - halfInnerMargin;
      const bottomY = y + halfInnerMargin;
      p.line(contentLeftX, topY, contentRightX, topY);
      p.line(contentLeftX, bottomY, contentRightX, bottomY);
    }
  }

  p.pop();
};
