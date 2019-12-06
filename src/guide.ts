import { p } from "./shared";
import * as Parameters from "./parameters";

export const draw = (parameters: Parameters.Unit) => {
  const {
    width,
    height,
    columns,
    rows,
    outerMargin: {
      top: topMargin,
      bottom: bottomMargin,
      left: leftMargin,
      right: rightMargin
    }
  } = parameters;

  const contentWidth = width - leftMargin - rightMargin;
  const contentHeight = height - topMargin - bottomMargin;

  const columnWidth = contentWidth / columns;
  const rowHeight = contentHeight / rows;

  p.push();
  p.stroke(255, 0, 128);
  p.noFill();

  p.rect(1, 1, width - 2, height - 2);
  p.rect(leftMargin + 1, topMargin + 1, contentWidth - 2, contentHeight - 2);

  for (let i = 1; i < columns; i += 1) {
    const x = leftMargin + i * columnWidth;
    p.line(x, topMargin, x, height - bottomMargin);
  }
  for (let i = 1; i < rows; i += 1) {
    const y = topMargin + i * rowHeight;
    p.line(leftMargin, y, width - rightMargin, y);
  }

  p.pop();
};
