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

export {shuffle, getMinutes};
