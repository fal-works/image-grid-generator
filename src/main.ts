import p5 from "p5";
import { p, setP5Instance } from "./shared";
import { DropZone, Button, ImgElement, Utility as DomUtility } from "./dom";
import { Settings, ThumbnailArea, ParameterArea, Guide } from "./components";
import * as ImageGrid from "./image-grid";
import * as Parameters from "./parameters";
import { preventDragDrop } from "./prevent-drag-drop";

// ---- variables -------------------------------------------------------------

const imageFiles: p5.File[] = [];

let imageGridGraphics: p5.Graphics | undefined = undefined;

let parameterArea: ParameterArea.Unit;
let generateButton: p5.Element;
let saveButton: p5.Element;

let processing = false;
let drawGeneratedGrid = () => {
  p.background(255);
  p.push();
  p.stroke(224);
  p.noFill();
  p.strokeWeight(1);
  p.rect(1, 1, p.width - 2, p.height - 2);
  p.pop();
};

// ---- functions -------------------------------------------------------------

const startProcessing = () => {
  processing = true;
  p.cursor(p.WAIT);

  generateButton.style("cursor", "wait");
  saveButton.style("cursor", "wait");
};

const endProcessing = () => {
  processing = false;
  p.cursor(p.ARROW);

  generateButton.style("cursor", "pointer");
  saveButton.style("cursor", "pointer");
};

const completeGenerate = (parameters: Parameters.Unit) => (
  imgList: readonly p5.Element[]
) => {
  if (imgList.length <= 0) {
    endProcessing();
    return;
  }

  const grid = ImageGrid.create(imgList, parameters);

  const scaleFactor = Math.min(
    1,
    Math.min(p.width / grid.width, p.height / grid.height)
  );
  const displayWidth = scaleFactor * grid.width;
  const displayHeight = scaleFactor * grid.height;

  drawGeneratedGrid = () => {
    p.background(255);
    p.image(grid, p.width / 2, p.height / 2, displayWidth, displayHeight);
  };

  drawGeneratedGrid();

  imageGridGraphics = grid;
  endProcessing();
};

const startGenerate = () => {
  if (processing) return;

  const { parameters } = parameterArea;
  const cellCount = parameters.rows * parameters.columns;
  if (cellCount < 1) return;

  const files: p5.File[] = p.shuffle(imageFiles).slice(0, cellCount);
  if (files.length <= 0) return;

  startProcessing();

  ImgElement.createList({
    files,
    hide: true,
    warnOnFail: true,
    onComplete: completeGenerate(parameters),
    onFailAny: endProcessing
  });
};

const saveResult = () => {
  if (!imageGridGraphics) return;

  p.save(imageGridGraphics, parameterArea.parameters.fileName);
};

// ---- setup -----------------------------------------------------------------

const setupDropZone = () => {
  const thumbnails = ThumbnailArea.create({
    position: Settings.thumbnailAreaPosition,
    size: Settings.thumbnailAreaSize,
    initialColumns: 4
  });

  const onAddThumbnail = (img: p5.Element, file: p5.File) => {
    img.style("pointer-events", "none");
    imageFiles.push(file);
  };
  const onDrop = (file: p5.File) =>
    ThumbnailArea.add(thumbnails, file, onAddThumbnail);

  DropZone.create({
    position: Settings.dropZonePosition,
    size: Settings.dropZoneSize,
    onDrop
  });
};

const setupButtons = () => {
  generateButton = Button.create({
    label: "generate",
    onClick: startGenerate,
    position: Settings.generateButtonPosition,
    size: Settings.generateButtonSize,
    cursor: "pointer"
  });

  saveButton = Button.create({
    label: "save",
    onClick: saveResult,
    position: Settings.saveButtonPosition,
    size: Settings.saveButtonSize,
    cursor: "pointer"
  });
};

const setupParameterArea = () => {
  parameterArea = ParameterArea.create({
    onMouseEnter: area => {
      Guide.draw(area.parameters);
    },
    onMouseLeave: () => {
      drawGeneratedGrid();
    },
    onChange: area => {
      drawGeneratedGrid();
      Guide.draw(area.parameters);
    }
  });
};

const setup = () => {
  const { width, height } = Settings.canvasSize;
  const canvas = p.createCanvas(width, height);
  DomUtility.setPosition(canvas, Settings.canvasPosition);

  preventDragDrop();

  p.imageMode(p.CENTER);

  setupDropZone();
  setupButtons();
  setupParameterArea();

  p.background(255);
  Guide.draw(Parameters.defaultValues);
};

new p5(p5Instance => {
  setP5Instance(p5Instance);
  p.setup = setup;
}, document.getElementById("ImageGridResult") || document.body);
