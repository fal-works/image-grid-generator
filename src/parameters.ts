type OuterMargin = {
  readonly top: number;
  readonly bottom: number;
  readonly left: number;
  readonly right: number;
};

export type Unit = {
  readonly width: number;
  readonly height: number;
  readonly columns: number;
  readonly rows: number;
  readonly outerMargin: OuterMargin;
  readonly innerMargin: number;
  readonly backgroundColorCode: string;
  readonly fileName: string;
};

export const defaultValues: Unit = {
  width: 800,
  height: 800,
  columns: 2,
  rows: 2,
  outerMargin: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  innerMargin: 0,
  backgroundColorCode: "#FFFFFF00",
  fileName: "image-grid.png"
};

export const stringify = (parameters: Unit) =>
  JSON.stringify(parameters, undefined, 2);

export const defaultString = stringify(defaultValues);

const reviver = (key: string, value: any) =>
  key === "" ||
  Number.isFinite(value) ||
  (typeof value === "object" && !Array.isArray(value)) ||
  typeof value === "string"
    ? value
    : undefined;

const validateNumber = (
  value: any,
  defaultValue: number,
  maxValue = 10000
): number =>
  Number.isFinite(value) && value < maxValue ? value : defaultValue;

const validateString = (
  value: any,
  defaultValue: string,
  maxLength = 100
): string =>
  typeof value === "string" && value.length <= maxLength ? value : defaultValue;

const validateOuterMargin = (parsed: any): OuterMargin => {
  const defaultMargin = defaultValues.outerMargin;

  if (typeof parsed === "number") {
    const margin = validateNumber(parsed, defaultMargin.top);

    return {
      top: margin,
      bottom: margin,
      left: margin,
      right: margin
    };
  }

  return {
    top: validateNumber(parsed.top, defaultMargin.top),
    bottom: validateNumber(parsed.bottom, defaultMargin.bottom),
    left: validateNumber(parsed.left, defaultMargin.left),
    right: validateNumber(parsed.right, defaultMargin.right)
  };
};

const validate = (parsed: any): Unit => {
  const width = validateNumber(parsed.width, defaultValues.width);
  const height = validateNumber(parsed.height, defaultValues.height);
  const columns = validateNumber(parsed.columns, defaultValues.columns);
  const rows = validateNumber(parsed.rows, defaultValues.rows);

  const outerMargin = validateOuterMargin(parsed.outerMargin);

  const innerMargin = validateNumber(
    parsed.innerMargin,
    defaultValues.innerMargin
  );

  const backgroundColorCode = validateString(
    parsed.backgroundColorCode,
    defaultValues.backgroundColorCode
  );

  const fileName = validateString(parsed.fileName, defaultValues.fileName);

  return {
    width,
    height,
    columns,
    rows,
    outerMargin,
    innerMargin,
    backgroundColorCode,
    fileName
  };
};

export const parse = (jsonString: string): Unit => {
  if (typeof jsonString !== "string") return defaultValues;

  try {
    return validate(JSON.parse(jsonString, reviver));
  } catch (_) {
    return defaultValues;
  }
};

export const calculate = (parameters: Unit) => {
  const { width, height, columns, rows, outerMargin, innerMargin } = parameters;

  const contentWidth = parameters.width - outerMargin.left - outerMargin.right;
  const contentHeight =
    parameters.height - outerMargin.top - outerMargin.bottom;

  const contentLeftX = outerMargin.left;
  const contentTopY = outerMargin.top;
  const contentRightX = width - outerMargin.right;
  const contentBottomY = height - outerMargin.bottom;

  const columnWidth = contentWidth / columns;
  const rowHeight = contentHeight / rows;

  const cellWidth = (contentWidth - (columns - 1) * innerMargin) / columns;
  const cellHeight = (contentHeight - (rows - 1) * innerMargin) / rows;

  return {
    contentWidth,
    contentHeight,
    contentLeftX,
    contentTopY,
    contentRightX,
    contentBottomY,
    columnWidth,
    rowHeight,
    cellWidth,
    cellHeight
  };
};
