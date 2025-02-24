export const getElementInfo = (element: Element) => {
  const computedStyles = getComputedStyle(element);

  const elementTagName = element?.tagName?.toLowerCase();

  const elementInfos = `
    Font Size: ${computedStyles.fontSize || "N/A"}
    Display: ${computedStyles.display}
    Margin: ${computedStyles.margin || "N/A"}
    Gap: ${computedStyles.gap || "N/A"}
    Background: ${computedStyles.backgroundColor || "N/A"}
  `;

  return { elementTagName, elementInfos };
};
