import p5 from "p5";

let p: p5;
let dropzone: p5.Element;
const originalImages: p5.Element[] = [];
const originalImageColumns = 10;
const thumbnailSize = 960 / 10;

let gridImage: p5.Graphics | undefined = undefined;

function highlight() {
  dropzone.style("background-color", "#ccc");
}

function unhighlight() {
  dropzone.style("background-color", "#fff");
}

const addImage = (file: p5.File) => {
  if (file.type !== "image") return;

  const thumbnail = p.createImg(file.data, file.name, () => {
    if (!thumbnail) return;

    const originalSize = thumbnail.size() as { width: number; height: number };
    const { width, height } = originalSize;
    const scaleFactor = thumbnailSize / Math.max(width, height);

    thumbnail.size(width * scaleFactor, height * scaleFactor);

    const thumbnailRow = Math.floor(
      originalImages.length / originalImageColumns
    );
    const thumbnailColumn = originalImages.length % originalImageColumns;
    thumbnail.position(
      thumbnailSize * thumbnailColumn,
      30 + thumbnailSize * thumbnailRow
    );
  });

  const img = p.createImg(file.data, undefined, () => {
    if (!img) {
      console.warn(`"Failed to load ${file.name}`);
      return;
    }

    img.hide();

    originalImages.push(img);
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

  dropzone = p.createDiv();
  dropzone.position(0, 0);
  dropzone.size(p.width, p.height / 2);
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(addImage, unhighlight);

  const generateButton = p.createButton("generate");
  generateButton.mouseClicked(generate);
  generateButton.position(0, 5);
  generateButton.size(100, 25);

  const saveButton = p.createButton("save");
  saveButton.mouseClicked(saveResult);
  saveButton.position(120, 5);
  saveButton.size(80, 25);
};

new p5(p5Instance => {
  p = p5Instance;
  p.setup = setup;
});
