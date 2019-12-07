import { RectangleSize } from "./types";

export const fitToBox = (
  contentSize: RectangleSize,
  containerSize: RectangleSize
) => {
  const { width, height } = contentSize;
  const scaleFactor = Math.min(
    containerSize.width / width,
    containerSize.height / height
  );

  return {
    width: width * scaleFactor,
    height: height * scaleFactor
  };
};

export const shrinkToBox = (
  contentSize: RectangleSize,
  containerSize: RectangleSize
) => {
  const { width, height } = contentSize;
  const scaleFactor = Math.min(
    1,
    Math.min(containerSize.width / width, containerSize.height / height)
  );

  return {
    width: width * scaleFactor,
    height: height * scaleFactor
  };
};
