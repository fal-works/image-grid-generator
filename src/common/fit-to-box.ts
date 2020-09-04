import { RectangleSize } from "./types";

export const getScaleFactorToFit = (
  contentSize: RectangleSize,
  containerSize: RectangleSize
): number => {
  const { width, height } = contentSize;
  return Math.min(containerSize.width / width, containerSize.height / height);
};

export const fitToBox = (
  contentSize: RectangleSize,
  containerSize: RectangleSize
): RectangleSize => {
  const scaleFactor = getScaleFactorToFit(contentSize, containerSize);

  return {
    width: contentSize.width * scaleFactor,
    height: contentSize.height * scaleFactor,
  };
};

export const getScaleFactorToShrink = (
  contentSize: RectangleSize,
  containerSize: RectangleSize
): number => {
  const { width, height } = contentSize;
  return Math.min(
    1,
    Math.min(containerSize.width / width, containerSize.height / height)
  );
};

export const shrinkToBox = (
  contentSize: RectangleSize,
  containerSize: RectangleSize
): RectangleSize => {
  const scaleFactor = getScaleFactorToShrink(contentSize, containerSize);

  return {
    width: contentSize.width * scaleFactor,
    height: contentSize.height * scaleFactor,
  };
};
