const list = document.querySelector(".sortable-list");
let draggedItem = null;

list.addEventListener('dragstart', (event) => {
  draggedItem = event.target;
});

list.addEventListener('dragover', (event) => {
  event.preventDefault();
  const element = getDraggableElement(event);
  if (element) {
    const bounding = element.getBoundingClientRect();
    const offset = bounding.y + (bounding.height / 2);
    if (event.clientY > offset) {
      list.insertBefore(draggedItem.nextSibling, element.nextSibling);
    } else {
      list.insertBefore(draggedItem, element);
    }
  }
});

const getDraggableElement = (event) => {
  let element = event.target;
  while (element && !element.draggable) {
    element = element.parentNode;
  }
  return element;
};
