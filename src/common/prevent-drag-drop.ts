export const preventDragDrop = (): void => {
  window.addEventListener(
    "dragover",
    (event) => {
      event.preventDefault();
    },
    false
  );
  window.addEventListener(
    "drop",
    (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    false
  );
};
