import dayjs from 'dayjs';

const checkControlStatus = (controlStatus, activeClass) => {
  if (controlStatus) {
    return activeClass;
  } else {
    return '';
  }
};

/*const sortRatingDown = (filmA, filmB) => {

};*/

const sortDateDown = (filmA, filmB) => {
  const weight = 0;

  return weight ?? dayjs(filmB.release.date).diff(dayjs(filmA.release.date));
};


export {checkControlStatus, sortDateDown};
