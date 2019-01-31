export default tag => {
  return attributes => {
    const element = document.createElement(tag);
    const events = [
      "click",
      "submit",
      "focus",
      "keydown",
      "keyup",
      "change",
      "keypress"
    ];
    if (attributes) {
      Object.keys(attributes).forEach(function(attribute) {
        if (events.indexOf(attribute) < 0) {
          element.setAttribute(attribute, attributes[attribute]);
        } else {
          element.addEventListener(attribute, attributes[attribute], false);
        }
      });
    }
    return children => {
      if (children && children.text) {
        element.textContent = children.text;
      }
      if (children && children.length) {
        const fragment = document.createDocumentFragment();
        children.forEach(function(child) {
          fragment.appendChild(child);
        });
        element.appendChild(fragment);
      }
      return element;
    };
  };
};
