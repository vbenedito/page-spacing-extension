export function styleButton(
  button: HTMLButtonElement,
  top: number,
  color: string
) {
  button.style.position = "fixed";
  button.style.top = `${top}px`;
  button.style.left = "10px";
  button.style.zIndex = "9999";
  button.style.backgroundColor = color;
  button.style.color = "white";
  button.style.border = "none";
  button.style.padding = "10px";
  button.style.cursor = "pointer";
}
