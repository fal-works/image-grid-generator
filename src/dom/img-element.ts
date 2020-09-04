import p5 from "p5";
import { p } from "../common/shared";

export const create = (parameters: {
  file: p5.File;
  alt?: string;
  hide?: boolean;
  onLoad?: (img: p5.Element, file: p5.File) => void;
  onFail?: (file: p5.File) => void;
  warnOnFail?: boolean;
}): p5.Element => {
  const {
    file: { data: url },
    alt,
    hide,
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

type ListParameters = {
  getAlt: (file: p5.File) => string | undefined;
  hide: boolean;
  onLoadEach: (img: p5.Element, file: p5.File, index: number) => void;
  onFailEach: (file: p5.File, index: number) => void;
  warnOnFail: boolean;
  onEnd: (files: readonly p5.File[]) => void;
  onSuccess: (imgList: p5.Element[]) => void;
  onFailAny: (files: readonly p5.File[]) => void;
};

const defaultListParameters: ListParameters = {
  getAlt: returnUndefined,
  hide: false,
  onLoadEach: returnVoid,
  onFailEach: returnVoid,
  warnOnFail: true,
  onSuccess: returnVoid,
  onFailAny: returnVoid,
  onEnd: returnVoid,
};

/**
 * Creates IMG element for each file in `files` asynchronously.
 * If `files` are empty, calls `onEnd` (if specified) immediately.
 * @param files
 * @param parameters
 */
export const createList = (
  files: readonly p5.File[],
  parameters: Partial<ListParameters>
): p5.Element[] | undefined => {
  if (files.length <= 0) {
    if (parameters.onEnd) parameters.onEnd(files);
    return undefined;
  }

  const parameterValues = Object.assign(
    Object.create(defaultListParameters),
    parameters
  );

  const {
    getAlt,
    hide,
    onLoadEach,
    onFailEach,
    warnOnFail,
    onSuccess,
    onEnd,
  } = parameterValues;
  let onFailAny = parameterValues.onFailAny;
  const fileCount = files.length;

  const loadedImages: p5.Element[] = [];
  let processedCount = 0;

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    create({
      file,
      alt: getAlt(file),
      hide,
      onLoad: (img, file) => {
        onLoadEach(img, file, i);
        loadedImages.push(img);
        if (loadedImages.length === fileCount) onSuccess(loadedImages);
        processedCount += 1;
        if (processedCount === fileCount) onEnd(files);
      },
      onFail: (file) => {
        onFailEach(file, i);
        onFailAny(files);
        onFailAny = returnVoid;
        processedCount += 1;
        if (processedCount === fileCount) onEnd(files);
      },
      warnOnFail,
    });
  }

  return loadedImages;
};
