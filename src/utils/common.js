const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDecimalNumber = (max, min) => ((Math.random() * (max - min)) + min).toFixed(1);


const generateRandomElement = (arrayItem) => {

  const randomIndex = getRandomInteger(0, arrayItem.length - 1);

  return arrayItem[randomIndex];
};


export {getRandomInteger, generateRandomElement, getRandomDecimalNumber};

