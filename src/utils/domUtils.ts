export function styleButton(
  button: HTMLButtonElement,
  bottom: number,
  color: string
) {
  button.style.bottom = `${bottom}px`;
  button.className = "button";
  button.style.backgroundColor = color;
}
