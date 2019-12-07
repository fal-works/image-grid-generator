import p5 from "p5";
import { p } from "../shared";

export const create = (parameters: {
  file: p5.File;
  alt?: string;
  hide?: boolean;
  onLoad?: (img: p5.Element, file: p5.File) => void;
  onFail?: (file: p5.File) => void;
  warnOnFail?: boolean;
}) => {
  const {
    file: { data: url },
    alt,
    hide
  } = parameters;

  const img = p.createImg(url, alt, () => {
    const { file, warnOnFail, onLoad, onFail } = parameters;

    if (!img) {
      if (warnOnFail) console.warn(`"Failed to load ${file.name}`);
      if (onFail) onFail(file);
      return;
    }

    if (onLoad) onLoad(img, file);
  });

  if (hide) img.hide();

  return img;
};

const returnVoid = () => {
  return;
};
const returnUndefined = () => undefined;

/**
 * Creates IMG element for each file in `files`.
 * Does nothing if `files` are empty.
 * @param parameters
 */
export const createList = (parameters: {
  files: readonly p5.File[];
  getAlt?: (file: p5.File) => string | undefined;
  hide?: boolean;
  onLoadEach?: (img: p5.Element, file: p5.File, index: number) => void;
  onFailEach?: (file: p5.File, index: number) => void;
  warnOnFail?: boolean;
  onComplete?: (imgList: p5.Element[]) => void;
  onFailAny?: (files: readonly p5.File[]) => void;
}) => {
  const { files, hide, warnOnFail } = parameters;
  if (files.length <= 0) return undefined;

  const getAlt = parameters.getAlt || returnUndefined;
  const onLoadEach = parameters.onLoadEach || returnVoid;
  const onFailEach = parameters.onFailEach || returnVoid;
  const onComplete = parameters.onComplete || returnVoid;
  let onFailAny = parameters.onFailAny || returnVoid;
  const fileCount = files.length;

  const loadedImages: p5.Element[] = [];

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    create({
      file,
      alt: getAlt(file),
      hide,
      onLoad: (img, file) => {
        onLoadEach(img, file, i);
        loadedImages.push(img);
        if (loadedImages.length === fileCount) onComplete(loadedImages);
      },
      onFail: file => {
        onFailEach(file, i);
        onFailAny(files);
        onFailAny = returnVoid;
      },
      warnOnFail
    });
  }

  return loadedImages;
};
