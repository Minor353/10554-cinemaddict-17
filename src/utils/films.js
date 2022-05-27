import dayjs from 'dayjs';
import { getRandomInteger } from './common.js';


const generateRandomDate = (rangeType, min, max) => {
  const daysGap = getRandomInteger(max, min);

  return dayjs().add(daysGap, rangeType).toDate();
};

const sortDateDown = (filmA, filmB) => dayjs(filmB['film_info'].release.date).diff(dayjs(filmA['film_info'].release.date));

const sortRateDown = (filmA, filmB) => filmB['film_info']['total_rating'] - filmA['film_info']['total_rating'];


export {sortRateDown, sortDateDown, generateRandomDate};
