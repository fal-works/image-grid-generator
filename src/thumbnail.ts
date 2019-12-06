import p5 from "p5";
import * as DomUtility from "./dom-utility";
import { CANVAS_SIZE } from "./settings";

export let currentRegisteredCount = 0;
const columns = 10;
const boxSize = {
  width: CANVAS_SIZE.width / columns,
  height: CANVAS_SIZE.height / columns
};
const offsetY = 30;

export const onLoad = (thumbnail: p5.Element) => {
  const index = currentRegisteredCount++;
  const row = Math.floor(index / columns);
  const column = index % columns;
  const boxPosition = {
    x: boxSize.width * column,
    y: boxSize.height * row + offsetY
  };
  DomUtility.setInBox(thumbnail, boxPosition, boxSize);
};
