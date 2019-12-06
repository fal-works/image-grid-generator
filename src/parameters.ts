export type Unit = {
  width: number;
  height: number;
  columns: number;
  rows: number;
};

export const defaultValues: Unit = {
  width: 960,
  height: 960,
  columns: 3,
  rows: 3
};

export const defaultString = JSON.stringify(defaultValues, undefined, 2);

export const parse = (jsonString: string): Unit =>
  Object.assign(Object.create(defaultValues), JSON.parse(jsonString));
