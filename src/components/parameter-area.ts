import p5 from "p5";
import { p } from "../common/shared";
import * as TextArea from "../dom/text-area";
import * as Button from "../dom/button";
import * as Settings from "./settings";
import * as Parameters from "../parameters";

export interface Unit {
  readonly element: p5.Element;
  contentText: string;
  parameters: Parameters.Unit;
  monitorIntervalId?: NodeJS.Timeout;
}

type Listeners = {
  onChange: (area: Unit) => void;
  onMouseEnter: (area: Unit) => void;
  onMouseLeave: (area: Unit) => void;
};

const returnVoid = () => {};
const defaultListeners: Listeners = {
  onChange: returnVoid,
  onMouseEnter: returnVoid,
  onMouseLeave: returnVoid
};

export const create = (listeners: {
  onChange?: (area: Unit) => void;
  onMouseEnter?: (area: Unit) => void;
  onMouseLeave?: (area: Unit) => void;
}): Unit => {
  const { onChange, onMouseEnter, onMouseLeave } = Object.assign(
    Object.create(defaultListeners),
    listeners
  );

  const element = TextArea.create({
    position: Settings.parameterAreaPosition,
    size: Settings.parameterAreaSize,
    initialValue: Parameters.defaultString
  });

  const area: Unit = {
    element,
    contentText: Parameters.defaultString,
    parameters: Parameters.defaultValues,
    monitorIntervalId: undefined
  };

  const monitorChange = () => {
    const currentText = element.value().toString();
    if (currentText === area.contentText) return;

    area.contentText = currentText;
    area.parameters = Parameters.parse(currentText);

    onChange(area);
  };

  const setText = (text: string) => {
    area.element.value(text);
    monitorChange();
  };
  const setYamlTextFrom = (parameters: Parameters.Unit) =>
    setText(Parameters.toYamlString(parameters));
  const setJsonTextFrom = (parameters: Parameters.Unit) =>
    setText(Parameters.toJsonString(parameters));

  const htmlElement = element.elt as HTMLInputElement;

  htmlElement.addEventListener("focus", () => {
    area.monitorIntervalId = setInterval(monitorChange, 100);
  });
  htmlElement.addEventListener("blur", () => {
    const { monitorIntervalId } = area;
    if (monitorIntervalId) {
      clearInterval(monitorIntervalId);
      area.monitorIntervalId = undefined;
    }
  });

  htmlElement.addEventListener(
    "mouseenter",
    onMouseEnter.bind(undefined, area)
  );
  htmlElement.addEventListener(
    "mouseleave",
    onMouseLeave.bind(undefined, area)
  );

  const select = p.createSelect();
  select.position(Settings.modeSelectPositon.x, Settings.modeSelectPositon.y);
  select.size(Settings.modeSelectSize.width, Settings.modeSelectSize.height);
  (select as any).option("YAML");
  (select as any).option("JSON");
  (select as any).changed(() => {
    switch (select.value().toString()) {
      case "YAML":
        setYamlTextFrom(area.parameters);
        break;
      case "JSON":
        setJsonTextFrom(area.parameters);
        break;
    }
  });

  const resetButton = Button.create({
    label: "reset",
    onClick: () => {
      setText(Parameters.defaultString);
      select.value("YAML");
    },
    position: Settings.resetParametersButtonPositon,
    size: Settings.resetParametersButtonSize,
    cursor: "pointer"
  });
  resetButton.style("font-size", "medium");

  return area;
};
