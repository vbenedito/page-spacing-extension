export const styleButton = (
  button: HTMLButtonElement,
  bottom: number,
  color: string
) => {
  button.style.bottom = `${bottom}px`;
  button.className = "page-ruler-button";
  button.style.backgroundColor = color;
};
