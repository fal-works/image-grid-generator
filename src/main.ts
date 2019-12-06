import p5 from "p5";
import { p, setP5Instance } from "./shared";
import * as DropZone from "./drop-zone";
import * as Button from "./dom/button";
import * as ImgElement from "./dom/img-element";
import { CANVAS_SIZE } from "./settings";
import * as ThumbnailArea from "./thumbnail-area";
import * as ImageGrid from "./image-grid";

const imageFiles: p5.File[] = [];

let gridImage: p5.Graphics | undefined = undefined;

const completeGenerate = (rows: number, columns: number) => (
  imgList: readonly p5.Element[]
) => {
  const grid = ImageGrid.create({
    images: imgList,
    rows,
    columns,
    wholeSize: { width: 960, height: 960 }
  });

  p.image(grid, p.width / 2 - 480 / 2, p.height / 2, 480, 480);

  gridImage = grid;
};

const startGenerate = () => {
  p.background(255);

  const rows = 3;
  const columns = 3;

  const files: p5.File[] = p.shuffle(imageFiles).slice(0, rows * columns);

  ImgElement.createList({
    files,
    hide: true,
    warnOnFail: true,
    onComplete: completeGenerate(rows, columns)
  });
};

const saveResult = () => {
  if (!gridImage) return;

  p.save(gridImage, `grid-image.png`);
};

const setupDropZone = () => {
  const thumbnails = ThumbnailArea.create({
    position: { x: 0, y: 30 },
    size: { width: p.width, height: 0.45 * p.height },
    initialColumns: 8
  });

  const onAddThumbnail = (_: p5.Element, file: p5.File) =>
    imageFiles.push(file);
  const onDropFile = (file: p5.File) =>
    ThumbnailArea.add(thumbnails, file, onAddThumbnail);

  DropZone.create(onDropFile);
};

const setup = () => {
  p.createCanvas(CANVAS_SIZE.width, CANVAS_SIZE.height);

  setupDropZone();

  Button.create({
    label: "generate",
    onClick: startGenerate,
    position: { x: 0, y: 5 },
    size: { width: 100, height: 25 }
  });

  Button.create({
    label: "save",
    onClick: saveResult,
    position: { x: 120, y: 5 },
    size: { width: 80, height: 25 }
  });
};

new p5(p5Instance => {
  setP5Instance(p5Instance);
  p.setup = setup;
});
