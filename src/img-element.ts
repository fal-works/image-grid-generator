import p5 from "p5";
import { p } from "./shared";

export const create = (parameters: {
  file: p5.File;
  alt?: string;
  hide?: boolean;
  onLoad?: (img: p5.Element) => void;
  onFail?: (file: p5.File) => void;
  warnOnFail?: boolean;
}) => {
  const {
    file: { data: url },
    alt
  } = parameters;

  const img = p.createImg(url, alt, () => {
    const { file, warnOnFail, hide, onLoad, onFail } = parameters;

    if (!img) {
      if (warnOnFail) console.warn(`"Failed to load ${file.name}`);
      if (onFail) onFail(file);
      return;
    }

    if (hide) img.hide();
    if (onLoad) onLoad(img);
  });

  return img;
};
