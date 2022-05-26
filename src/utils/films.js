const checkControlStatus = (controlStatus, activeClass) => {
  if (controlStatus) {
    return activeClass;
  } else {
    return '';
  }
};

export {checkControlStatus};
