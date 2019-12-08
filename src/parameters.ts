import { safeLoad as loadYaml, safeDump as yamlStringify } from "js-yaml";

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

export const toJsonString = (parameters: Unit) =>
  JSON.stringify(parameters, undefined, 2);

export const toYamlString = (parameters: Unit) => yamlStringify(parameters);

export const defaultString = toYamlString(defaultValues);

const reviver = (key: string, value: any) =>
  key === "" ||
  isFinite(value) ||
  (typeof value === "object" && !Array.isArray(value)) ||
  typeof value === "string"
    ? value
    : undefined;

const validateNumber = (
  value: any,
  defaultValue: number,
  minValue = -10000,
  maxValue = 10000
): number => {
  const n = parseInt(value);
  return Number.isFinite(n) && n >= minValue && n <= maxValue
    ? n
    : defaultValue;
};

const validateString = (
  value: any,
  defaultValue: string,
  maxLength = 100
): string => {
  const s = value.toString();
  return typeof s === "string" && s.length > 0 && s.length <= maxLength
    ? s
    : defaultValue;
};

const hex = "[\\da-fA-F]";
const colorCodeWithoutPrefixExpression = new RegExp(
  `^(${hex}{3}|${hex}{4}|${hex}{6}|${hex}{8})$`
);
const validateColorCode = (value: any, defaultValue: string): string => {
  const s = value.toString();
  return typeof s === "string"
    ? s.match(colorCodeWithoutPrefixExpression)
      ? `#${s}`
      : s
    : defaultValue;
};

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
  const width = validateNumber(parsed.width, defaultValues.width, 1);
  const height = validateNumber(parsed.height, defaultValues.height, 1);
  const columns = validateNumber(parsed.columns, defaultValues.columns, 1);
  const rows = validateNumber(parsed.rows, defaultValues.rows, 1);

  const outerMargin = validateOuterMargin(parsed.outerMargin);

  const innerMargin = validateNumber(
    parsed.innerMargin,
    defaultValues.innerMargin
  );

  const backgroundColorCode = validateColorCode(
    parsed.backgroundColorCode,
    defaultValues.backgroundColorCode
  );

  const fileName = validateString(parsed.fileName, defaultValues.fileName, 255);

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

export const parse = (parametersText: string): Unit => {
  if (typeof parametersText !== "string") return defaultValues;
  const trimmedText = parametersText.trim();

  try {
    if (trimmedText.substr(0, 1) === "{")
      return validate(JSON.parse(trimmedText, reviver));
    else return validate(loadYaml(trimmedText));
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
