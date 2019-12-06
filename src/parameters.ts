export type Unit = {
  readonly width: number;
  readonly height: number;
  readonly columns: number;
  readonly rows: number;
  readonly outerMargin: {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
  };
  readonly innerMargin: number;
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
  innerMargin: 0
};

export const defaultString = JSON.stringify(defaultValues, undefined, 2);

const reviver = (key: string, value: any) =>
  key === "" ||
  (typeof value === "object" && !Array.isArray(value)) ||
  Number.isFinite(value)
    ? value
    : undefined;

const validateNumber = (value: any, defaultValue: number) =>
  Number.isFinite(value) ? value : defaultValue;

export const parse = (jsonString: string): Unit => {
  const parsed = JSON.parse(jsonString, reviver);

  const width = validateNumber(parsed.width, defaultValues.width);
  const height = validateNumber(parsed.height, defaultValues.height);
  const columns = validateNumber(parsed.columns, defaultValues.columns);
  const rows = validateNumber(parsed.rows, defaultValues.rows);

  const parsedOuterMargin = parsed.outerMargin;
  const defaultOuterMargin = defaultValues.outerMargin;
  const outerMargin = {
    top: validateNumber(parsedOuterMargin.top, defaultOuterMargin.top),
    bottom: validateNumber(parsedOuterMargin.bottom, defaultOuterMargin.bottom),
    left: validateNumber(parsedOuterMargin.left, defaultOuterMargin.left),
    right: validateNumber(parsedOuterMargin.right, defaultOuterMargin.right)
  };

  const innerMargin = validateNumber(
    parsed.innerMargin,
    defaultValues.innerMargin
  );

  return { width, height, columns, rows, outerMargin, innerMargin };
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
