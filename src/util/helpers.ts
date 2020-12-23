export const CopyInputValues = (inputValues: string) => {
  let element = document.createElement("input");
  element.setAttribute("value", inputValues);
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
};
