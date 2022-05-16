import dayjs from 'dayjs';

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

export {humanizeReleaseDate, humanizeYear, transformIntToHour, humanizeCommentDay};
