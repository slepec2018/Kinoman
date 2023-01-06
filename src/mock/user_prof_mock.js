import {getRandomNumber} from '../utils/common.js';

const userRank = [
  `Junior Jedi`,
  `Padawan`,
  `Jedi Knight`,
  `Jedi Master`,
  `Grand Master`
];

const generateUserProfData = () => {
  const numberView = getRandomNumber(0, 499);

  if (numberView < 100) {
    return userRank[0];
  }

  if (numberView < 200) {
    return userRank[1];
  }

  if (numberView < 300) {
    return userRank[2];
  }

  if (numberView < 400) {
    return userRank[3];
  }

  return userRank[4];
};

export {generateUserProfData};
