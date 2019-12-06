/**
 * Image Grid.
 * @copyright FAL
 * @version 0.1.0
 */

(function(p5) {
  "use strict";

  p5 = p5 && p5.hasOwnProperty("default") ? p5["default"] : p5;

  let p;
  const setP5Instance = p5Instance => (p = p5Instance);

  const getSize = element => element.size();
  const fitToBox = (element, boxSize) => {
    const { width, height } = getSize(element);
    const scaleFactor = Math.min(
      boxSize.width / width,
      boxSize.height / height
    );
    element.size(width * scaleFactor, height * scaleFactor);
  };
  const positionTypes = {
    static: "static",
    absolute: "absolute",
    relative: "relative",
    fixed: "fixed"
  };
  const setPosition = (element, position, type = positionTypes.absolute) => {
    const style = element.elt.style;
    const { x, y } = position;
    style.position = type;
    style.left = `${x}px`;
    style.top = `${y}px`;
    return element;
  };
  const setInBox = (element, boxPosition, boxSize) => {
    fitToBox(element, boxSize);
    const size = getSize(element);
    setPosition(element, {
      x: boxPosition.x + (boxSize.width - size.width) / 2,
      y: boxPosition.y + (boxSize.height - size.height) / 2
    });
  };

  const create = parameters => {
    const { position, size, onDrop } = parameters;
    const dropZone = p.createDiv("Drop image files here");
    const highlight = () => dropZone.style("background-color", "#F0FAFF");
    const unhighlight = () => dropZone.style("background-color", "#FDFDFD");
    setPosition(dropZone, position).size(size.width, size.height);
    dropZone.addClass("drop-zone");
    dropZone
      .dragOver(highlight)
      .dragLeave(unhighlight)
      .drop(onDrop, () => {
        unhighlight();
        dropZone.elt.innerHTML = "";
      });
    unhighlight();
    return dropZone;
  };

  const create$1 = parameters => {
    const { label, onClick, position, size } = parameters;
    const button = p.createButton(label);
    button.mouseClicked(onClick);
    setPosition(button, position);
    button.size(size.width, size.height);
    return button;
  };

  const create$2 = parameters => {
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
  const createList = parameters => {
    const { files, hide, warnOnFail } = parameters;
    const getAlt = parameters.getAlt || returnUndefined;
    const onLoadEach = parameters.onLoadEach || returnVoid;
    const onFailEach = parameters.onFailEach || returnVoid;
    const onComplete = parameters.onComplete || returnVoid;
    const fileCount = files.length;
    const loadedImages = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      create$2({
        file,
        alt: getAlt(file),
        hide,
        onLoad: (img, file) => {
          onLoadEach(img, file, i);
          loadedImages.push(img);
          if (loadedImages.length === fileCount) onComplete(loadedImages);
        },
        onFail: file => onFailEach(file, i),
        warnOnFail
      });
    }
    return loadedImages;
  };

  const create$3 = parameters => {
    const { position, size, initialValue } = parameters;
    const area = p.createElement("textarea", initialValue);
    setPosition(area, position).size(size.width, size.height);
    return area;
  };

  const wholeSize = {
    width: 1280,
    height: 800
  };
  const leftZonePosition = {
    x: 0,
    y: 0
  };
  const leftZoneSize = {
    width: wholeSize.width - wholeSize.height,
    height: wholeSize.height
  };
  const leftZoneRightPadding = 20;
  const leftZoneInterval = 20;
  const dropZonePosition = {
    x: leftZonePosition.x,
    y: leftZonePosition.y
  };
  const dropZoneSize = {
    width: leftZoneSize.width - leftZoneRightPadding,
    height: 420
  };
  const thumnailAreaMargin = 1;
  const thumbnailAreaPosition = {
    x: dropZonePosition.x + thumnailAreaMargin,
    y: dropZonePosition.y + thumnailAreaMargin
  };
  const thumbnailAreaSize = {
    width: dropZoneSize.width - 2 * thumnailAreaMargin,
    height: dropZoneSize.height - 2 * thumnailAreaMargin
  };
  const generateButtonPosition = {
    x: leftZonePosition.x,
    y: dropZonePosition.y + dropZoneSize.height + leftZoneInterval
  };
  const buttonHeight = 40;
  const buttonHorizontalInterval = 16;
  const generateButtonSize = {
    width: 120,
    height: buttonHeight
  };
  const saveButtonPosition = {
    x:
      generateButtonPosition.x +
      buttonHorizontalInterval +
      generateButtonSize.width,
    y: generateButtonPosition.y
  };
  const saveButtonSize = {
    width: 120,
    height: buttonHeight
  };
  const parameterAreaPosition = {
    x: leftZonePosition.x,
    y: generateButtonPosition.y + buttonHeight + leftZoneInterval
  };
  const parameterAreaSize = {
    width: leftZoneSize.width - leftZoneRightPadding,
    height:
      leftZoneSize.height -
      (dropZoneSize.height + leftZoneInterval + buttonHeight + leftZoneInterval)
  };
  const canvasSize = {
    width: wholeSize.width - leftZoneSize.width,
    height: wholeSize.height
  };
  const canvasPosition = {
    x: leftZoneSize.width,
    y: 0
  };

  const create$4 = parameters => {
    const { position, size, initialColumns: columns } = parameters;
    const cellWidth = size.width / columns;
    return {
      position,
      size,
      columns,
      cellSize: { width: cellWidth, height: cellWidth },
      elements: []
    };
  };
  const setElement = (element, index, areaPosition, columns, cellSize) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const boxPosition = {
      x: areaPosition.x + cellSize.width * column,
      y: areaPosition.y + cellSize.height * row
    };
    setInBox(element, boxPosition, cellSize);
  };
  const changeColumns = (area, columns) => {
    const { position: areaPosition, size, elements } = area;
    area.columns = columns;
    const cellWidth = size.width / columns;
    area.cellSize = { width: cellWidth, height: cellWidth };
    for (let index = 0; index < elements.length; index += 1)
      setElement(elements[index], index, areaPosition, columns, area.cellSize);
  };
  const onLoad = (area, thumbnail) => {
    const { position, size, cellSize, columns, elements } = area;
    thumbnail.show();
    setElement(thumbnail, elements.length, position, columns, cellSize);
    area.elements.push(thumbnail);
    const actualHeight = Math.ceil(elements.length / columns) * cellSize.height;
    if (actualHeight > size.height) changeColumns(area, columns + 1);
  };
  const add = (area, file, onComplete) => {
    if (file.type !== "image") {
      console.warn(`Dropped file that is not an image:`, file);
      return;
    }
    create$2({
      file,
      alt: file.name,
      onLoad: (img, file) => {
        onLoad(area, img);
        onComplete(img, file);
      }
    }).hide();
  };

  const defaultValues = {
    width: 800,
    height: 800,
    columns: 2,
    rows: 2,
    outerMargin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    innerMargin: 0,
    backgroundColorCode: "#FFFFFF00"
  };
  const stringify = parameters => JSON.stringify(parameters, undefined, 2);
  const defaultString = stringify(defaultValues);
  const reviver = (key, value) =>
    key === "" ||
    Number.isFinite(value) ||
    (typeof value === "object" && !Array.isArray(value)) ||
    typeof value === "string"
      ? value
      : undefined;
  const validateNumber = (value, defaultValue) =>
    Number.isFinite(value) && value < 10000 ? value : defaultValue;
  const validateString = (value, defaultValue) =>
    typeof value === "string" ? value : defaultValue;
  const validateOuterMargin = parsed => {
    const defaultMargin = defaultValues.outerMargin;
    if (typeof parsed === "number") {
      const margin = validateNumber(parsed, defaultMargin.top);
      return {
        top: margin,
        bottom: margin,
        left: margin,
        right: margin
      };
    }
    return {
      top: validateNumber(parsed.top, defaultMargin.top),
      bottom: validateNumber(parsed.bottom, defaultMargin.bottom),
      left: validateNumber(parsed.left, defaultMargin.left),
      right: validateNumber(parsed.right, defaultMargin.right)
    };
  };
  const validate = parsed => {
    const width = validateNumber(parsed.width, defaultValues.width);
    const height = validateNumber(parsed.height, defaultValues.height);
    const columns = validateNumber(parsed.columns, defaultValues.columns);
    const rows = validateNumber(parsed.rows, defaultValues.rows);
    const outerMargin = validateOuterMargin(parsed.outerMargin);
    const innerMargin = validateNumber(
      parsed.innerMargin,
      defaultValues.innerMargin
    );
    const backgroundColorCode = validateString(
      parsed.backgroundColorCode,
      defaultValues.backgroundColorCode
    );
    return {
      width,
      height,
      columns,
      rows,
      outerMargin,
      innerMargin,
      backgroundColorCode
    };
  };
  const parse = jsonString => {
    if (typeof jsonString !== "string") return defaultValues;
    try {
      return validate(JSON.parse(jsonString, reviver));
    } catch (_) {
      return defaultValues;
    }
  };
  const calculate = parameters => {
    const {
      width,
      height,
      columns,
      rows,
      outerMargin,
      innerMargin
    } = parameters;
    const contentWidth =
      parameters.width - outerMargin.left - outerMargin.right;
    const contentHeight =
      parameters.height - outerMargin.top - outerMargin.bottom;
    const contentLeftX = outerMargin.left;
    const contentTopY = outerMargin.top;
    const contentRightX = width - outerMargin.right;
    const contentBottomY = height - outerMargin.bottom;
    const columnWidth = contentWidth / columns;
    const rowHeight = contentHeight / rows;
    const cellWidth = (contentWidth - (columns - 1) * innerMargin) / columns;
    const cellHeight = (contentHeight - (rows - 1) * innerMargin) / rows;
    return {
      contentWidth,
      contentHeight,
      contentLeftX,
      contentTopY,
      contentRightX,
      contentBottomY,
      columnWidth,
      rowHeight,
      cellWidth,
      cellHeight
    };
  };

  const create$5 = (images, parameters) => {
    const {
      width: graphicsWidth,
      height: graphicsHeight,
      rows,
      columns,
      outerMargin,
      innerMargin,
      backgroundColorCode
    } = parameters;
    const imageCount = images.length;
    const { cellWidth, cellHeight } = calculate(parameters);
    const graphics = p.createGraphics(graphicsWidth, graphicsHeight);
    const backgroundColor = p.color(backgroundColorCode);
    if (p.alpha(backgroundColor) > 0) graphics.background(backgroundColor);
    graphics.push();
    graphics.imageMode(p.CENTER);
    graphics.translate(
      outerMargin.left + cellWidth / 2,
      outerMargin.top + cellHeight / 2
    );
    let imageIndex = 0;
    for (
      let row = 0, y = 0;
      row < rows;
      row += 1, y += cellHeight + innerMargin
    ) {
      for (
        let column = 0, x = 0;
        column < columns;
        column += 1, x += cellWidth + innerMargin
      ) {
        if (imageIndex >= imageCount) break;
        const image = images[imageIndex++];
        const imageWidth = image.width;
        const imageHeight = image.height;
        const scaleFactor = Math.min(
          cellWidth / imageWidth,
          cellHeight / imageHeight
        );
        graphics.image(
          image,
          x,
          y,
          scaleFactor * imageWidth,
          scaleFactor * imageHeight
        );
      }
    }
    graphics.pop();
    return graphics;
  };

  const draw = parameters => {
    const { width, height, columns, rows, innerMargin } = parameters;
    const {
      contentWidth,
      contentHeight,
      contentLeftX,
      contentTopY,
      contentRightX,
      contentBottomY,
      columnWidth,
      rowHeight,
      cellWidth,
      cellHeight
    } = calculate(parameters);
    p.push();
    p.translate((p.width - width) / 2, (p.height - height) / 2);
    p.stroke(255, 64, 128);
    p.noFill();
    p.rect(1, 1, width - 2, height - 2);
    p.rect(
      contentLeftX + 1,
      contentTopY + 1,
      contentWidth - 2,
      contentHeight - 2
    );
    if (innerMargin <= 0) {
      for (let i = 1, x = contentLeftX; i < columns; i += 1) {
        x += columnWidth;
        p.line(x, contentTopY, x, contentBottomY);
      }
      for (let i = 1, y = contentTopY; i < rows; i += 1) {
        y += rowHeight;
        p.line(contentLeftX, y, contentRightX, y);
      }
    } else {
      for (let i = 1, x = contentLeftX; i < columns; i += 1) {
        x += cellWidth;
        p.line(x, contentTopY, x, contentBottomY);
        x += innerMargin;
        p.line(x, contentTopY, x, contentBottomY);
      }
      for (let i = 1, y = contentTopY; i < rows; i += 1) {
        y += cellHeight;
        p.line(contentLeftX, y, contentRightX, y);
        y += innerMargin;
        p.line(contentLeftX, y, contentRightX, y);
      }
    }
    p.pop();
  };

  const imageFiles = [];
  let gridImage = undefined;
  let parameterArea;
  let guideMode = false;
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
  const startProcessing = () => {
    processing = true;
    p.cursor(p.WAIT);
  };
  const endProcessing = () => {
    processing = false;
    p.cursor(p.ARROW);
  };
  const completeGenerate = parameters => imgList => {
    if (imgList.length <= 0) {
      endProcessing();
      return;
    }
    const grid = create$5(imgList, parameters);
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
    gridImage = grid;
    endProcessing();
  };
  const startGenerate = () => {
    if (processing) return;
    const parameters = parse(parameterArea.value().toString());
    const cellCount = parameters.rows * parameters.columns;
    if (cellCount < 1) return;
    processing = true;
    startProcessing();
    const files = p.shuffle(imageFiles).slice(0, cellCount);
    createList({
      files,
      hide: true,
      warnOnFail: true,
      onComplete: completeGenerate(parameters)
    });
  };
  const saveResult = () => {
    if (!gridImage) return;
    p.save(gridImage, `grid-image.png`);
  };
  const setupDropZone = () => {
    const thumbnails = create$4({
      position: thumbnailAreaPosition,
      size: thumbnailAreaSize,
      initialColumns: 4
    });
    const onAddThumbnail = (img, file) => {
      img.style("pointer-events", "none");
      imageFiles.push(file);
    };
    const onDrop = file => add(thumbnails, file, onAddThumbnail);
    create({
      position: dropZonePosition,
      size: dropZoneSize,
      onDrop
    });
  };
  const setupButtons = () => {
    create$1({
      label: "generate",
      onClick: startGenerate,
      position: generateButtonPosition,
      size: generateButtonSize
    }).style("font-size", "large");
    create$1({
      label: "save",
      onClick: saveResult,
      position: saveButtonPosition,
      size: saveButtonSize
    }).style("font-size", "large");
  };
  const setupParameterArea = () => {
    parameterArea = create$3({
      position: parameterAreaPosition,
      size: parameterAreaSize,
      initialValue: defaultString
    });
    parameterArea.elt.addEventListener("mouseenter", () => {
      guideMode = true;
      draw(parse(parameterArea.value().toString()));
    });
    parameterArea.elt.addEventListener("mouseleave", () => {
      guideMode = false;
      drawGeneratedGrid();
    });
    let parameterAreaValue = defaultString;
    setInterval(() => {
      if (!guideMode) return;
      const currentValue = parameterArea.value().toString();
      if (currentValue === parameterAreaValue) return;
      drawGeneratedGrid();
      draw(parse(currentValue));
      parameterAreaValue = currentValue;
    }, 100);
  };
  const setup = () => {
    const { width, height } = canvasSize;
    const canvas = p.createCanvas(width, height);
    setPosition(canvas, canvasPosition);
    p.imageMode(p.CENTER);
    setupDropZone();
    setupButtons();
    setupParameterArea();
    p.background(255);
    draw(defaultValues);
  };
  new p5(p5Instance => {
    setP5Instance(p5Instance);
    p.setup = setup;
  }, document.getElementById("ImageGridResult") || document.body);
})(p5);
//# sourceMappingURL=main.js.map
