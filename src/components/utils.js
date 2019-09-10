const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

const shuffle = (array) => {
  const shuffledArray = array.slice();
  let lengthArray = shuffledArray.length;
  let i;
  let temp;

  while (lengthArray) {
    i = Math.floor(Math.random() * lengthArray--);
    temp = shuffledArray[lengthArray];
    shuffledArray[lengthArray] = shuffledArray[i];
    shuffledArray[i] = temp;
  }

  return shuffledArray;
};

const getMinutes = (timestamp) => {
  return (new Date(timestamp).getMinutes() > 9) ? new Date(timestamp).getMinutes() : `0${new Date(timestamp).getMinutes()}`;
};

export {Position, shuffle, getMinutes, createElement, render, unrender};
