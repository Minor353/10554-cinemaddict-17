import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeYear = (date) => dayjs(date).format('YYYY');

const humanizeCommentDay = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

const transformIntToHour = (minutes) => {
  const hoursItem = Math.floor(minutes / 60);
  const minutesItem = Math.floor(minutes % 60);

  const hoursDisplay = hoursItem > 0 ? `${hoursItem} h ` : '';
  const minutesDisplay = minutesItem > 0 ? `${minutesItem} m ` : '';
  return hoursDisplay + minutesDisplay;

};

const generateRandomElement = (arrayItem) => {

  const randomIndex = getRandomInteger(0, arrayItem.length - 1);

  return arrayItem[randomIndex];
};

export {getRandomInteger, humanizeReleaseDate, humanizeYear, transformIntToHour, humanizeCommentDay, generateRandomElement};
