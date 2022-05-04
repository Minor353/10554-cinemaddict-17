import {getRandomInteger} from '../utils.js';


const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

export const generateComment = () => (
  {
    'id': String(getRandomInteger(0, 5)),
    'author': 'Ilya',
    'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    'date': '2019-06-11T16:12:32.554Z',
    'emotion': generateEmotion()
  }
);
