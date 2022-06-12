import { generateRandomElement, getRandomDecimalNumber} from '../utils/common.js';
import { generateRandomDate } from '../utils/films.js';
import {nanoid} from 'nanoid';

const titles = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
];


const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];


export const generateFilm = (item, index) => (
  {
    id: nanoid(),
    comments: [
      String(index)
    ],
    'film_info': {
      title: generateRandomElement(titles),
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': Number(getRandomDecimalNumber(10, 0)).toFixed(1),
      poster: `images/posters/${generateRandomElement(posters)}`,
      'age_rating': 12,
      director: 'Tom Ford',
      writers: [
        'Takeshi Kitano'
      ],
      actors: [
        'Morgan Freeman'
      ],
      release: {
        date: generateRandomDate('year', -40, 0),
        'release_country': 'Finland'
      },
      runtime: 77,
      genre: [
        'Comedy',
        'Drama'
      ],
      description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    'user_details': {
      watchlist: false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      favorite: true
    }
  }
);
