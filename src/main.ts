import p5 from "p5";
import { p, setP5Instance } from "./shared";
import * as DropZone from "./drop-zone";
import * as Button from "./button";
import * as ImgElement from "./img-element";

const originalImages: p5.Element[] = [];
const originalImageColumns = 10;
const thumbnailSize = 960 / 10;

let gridImage: p5.Graphics | undefined = undefined;

const onLoadThumbnail = (thumbnail: p5.Element) => {
  const originalSize = thumbnail.size() as {
    width: number;
    height: number;
  };
  const { width, height } = originalSize;
  const scaleFactor = thumbnailSize / Math.max(width, height);

  thumbnail.size(width * scaleFactor, height * scaleFactor);

  const thumbnailRow = Math.floor(originalImages.length / originalImageColumns);
  const thumbnailColumn = originalImages.length % originalImageColumns;
  thumbnail.position(
    thumbnailSize * thumbnailColumn,
    30 + thumbnailSize * thumbnailRow
  );
};

const addImage = (file: p5.File) => {
  if (file.type !== "image") return;

  ImgElement.create({
    file,
    alt: file.name,
    onLoad: onLoadThumbnail
  });

  ImgElement.create({
    file,
    hide: true,
    onLoad: img => originalImages.push(img),
    warnOnFail: true
  });
};

const generate = () => {
  p.background(255);

  const g = p.createGraphics(960, 960);
  const rows = 3;
  const columns = 3;

  const cellWidth = g.width / columns;
  const cellHeight = g.height / rows;

  const images: p5.Element[] = p.shuffle(originalImages);

  for (let row = 0; row < rows; row += 1) {
    const y = row * cellHeight;
    for (let column = 0; column < columns; column += 1) {
      const image = images.pop();
      if (!image) break;
      const x = column * cellWidth;
      g.image(image, x, y, cellWidth, cellHeight);
    }
  }

  p.image(g, p.width / 2 - 480 / 2, p.height / 2, 480, 480);

  gridImage = g;
};

const saveResult = () => {
  if (!gridImage) return;

  p.save(gridImage, `grid-image.png`);
};

const setup = () => {
  p.createCanvas(960, 960);

  DropZone.create(addImage);

  Button.create({
    label: "generate",
    onClick: generate,
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
