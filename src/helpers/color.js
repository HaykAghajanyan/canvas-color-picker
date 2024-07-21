export const rgbToHex = (r, g, b) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

export const changeSVGColor = color => {
  const path = document.querySelector('path');

  path.setAttribute('fill', color);
  path.setAttribute('stroke', color);
}
