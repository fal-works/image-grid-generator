export type Unit = {
  width: number;
  height: number;
  columns: number;
  rows: number;
};

export const defaultValues: Unit = {
  width: 800,
  height: 800,
  columns: 2,
  rows: 2
};

export const defaultString = JSON.stringify(defaultValues, undefined, 2);

const reviver = (key: string, value: any) =>
  key === "" || Number.isFinite(value) ? value : undefined;

export const parse = (jsonString: string): Unit =>
  Object.assign(Object.create(defaultValues), JSON.parse(jsonString, reviver));
