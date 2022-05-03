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
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);

  const hDisplay = h > 0 ? `${h} h ` : '';
  const mDisplay = m > 0 ? `${m} m ` : '';
  return hDisplay + mDisplay;

};

export {getRandomInteger, humanizeReleaseDate, humanizeYear, transformIntToHour, humanizeCommentDay};
