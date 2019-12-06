export type Unit = {
  readonly width: number;
  readonly height: number;
  readonly columns: number;
  readonly rows: number;
};

export const defaultValues: Unit = {
  width: 800,
  height: 800,
  columns: 2,
  rows: 2
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

  return { width, height, columns, rows };
};
