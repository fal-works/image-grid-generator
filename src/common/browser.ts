export enum Type {
  IE,
  Edge,
  Chrome,
  Safari,
  FireFox,
  Opera,
  Other
}

export const determine = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("msie") !== -1 || userAgent.indexOf("trident") !== -1)
    return Type.IE;
  if (userAgent.indexOf("edge") !== -1) return Type.Edge;
  if (userAgent.indexOf("chrome") !== -1) return Type.Chrome;
  if (userAgent.indexOf("safari") !== -1) return Type.Safari;
  if (userAgent.indexOf("firefox") !== -1) return Type.FireFox;
  if (userAgent.indexOf("opera") !== -1) return Type.Opera;

  return Type.Other;
};
