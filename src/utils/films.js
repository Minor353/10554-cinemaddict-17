import dayjs from 'dayjs';


const sortDateDown = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

const sortRateDown = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;


export {sortRateDown, sortDateDown};
