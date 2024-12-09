export const state = {
  firstSelectedLine: null as HTMLElement | null,
  secondSelectedLine: null as HTMLElement | null,
  isCommandPressed: false,
  selectedElements: [] as HTMLElement[],

  resetSelections() {
    this.firstSelectedLine = null;
    this.secondSelectedLine = null;
    this.selectedElements = [];
  },
};

export const isKeyPressed = { value: false };
