import { generateRandomElement} from '../utils/common.js';

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


export const generateFilm = () => (
  {
    id: '0',
    comments: [
      '1', '4'
    ],
    'film_info': {
      title: generateRandomElement(titles),
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
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
        'date': '2019-05-11T00:00:00.000Z',
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
      favorite: false
    }
  }
);
