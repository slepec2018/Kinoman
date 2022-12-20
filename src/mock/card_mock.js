import {getRandomItemArr, getRandomItemsArray, getRandomNumber, getRandomNumberPoint, getNumberWithLeadZero, generateLoremText} from '../utils.js';

const cardTitles = [
  `The Dark Knight`,
  `The Lion King`,
  `Intouchables`,
  `Ivan Vasilovich`,
  `Pulp Fiction`,
  `The Lord of the Rings: The Two Towers`,
  `The Lord of the Rings: The Fellowship of the Ring`,
  `Interstellar`,
  `Back to the Future`,
  `Coco`,
  `The Lord of the Rings: The Return of the King`,
  `Forrest Gump`,
  `The Shawshank Redemption`,
  `Schindler's List`,
  `The Green Mile`
];
const cardImages = [
  `images/posters/1.webp`,
  `images/posters/2.webp`,
  `images/posters/3.webp`,
  `images/posters/4.webp`,
  `images/posters/5.webp`,
  `images/posters/6.webp`,
  `images/posters/7.webp`,
  `images/posters/8.webp`,
  `images/posters/9.webp`,
  `images/posters/10.webp`,
  `images/posters/11.webp`,
  `images/posters/12.webp`,
  `images/posters/13.webp`,
  `images/posters/14.webp`,
  `images/posters/15.webp`
];
const cardTextSentenses = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
const cartGenres = [
  `Action`,
  `Western`,
  `Detective`,
  `Drama`,
  `Gangster`,
  `Historical`,
  `Comedy`,
  `Melodrama`
];

const cartDirectors = [
  `Christopher Nolan`,
  `Roger Allers`,
  `Olivier Nakache`,
  `Leonid Gaidai`,
  `Peter Jackson`,
  `Peter Jackson`,
  `Quentin Tarantino`,
  `Christopher Nolan`,
  `Robert Zemeckis`,
  `Lee Unkrich`,
  `Peter Jackson`,
  `Robert Zemeckis`,
  `Frank Darabont`,
  `Steven Spielberg`,
  `Frank Darabont`
];

const cartScreenwriters = [
  `Frank Darabont`,
  `Stephen King`,
  `Steven Zaillian`,
  `Thomas Keneally`,
  `Eric Roth`,
  `Winston Groom`,
  `Peter Jackson`,
  `Lee Unkrich`,
  `Bob Gale`,
  `Jonathan Nolan`,
  `Christopher Nolan`,
  `Quentin Tarantino`,
  `Fran Walsh`,
  `Philippa Boyens`,
  `Olivier Nakache`,
  `Irene Mecchi`,
];

const cartActors = [
  `Heath Ledger`,
  `Christian Bale`,
  `Matthew Broderick`,
  `Omar Sy`,
  `Leonid Kuravlev`,
  `Elijah Wood`,
  `Viggo Mortensen`,
  `Ian McKellen`,
  `John Travolta`,
  `Samuel L. Jackson`,
  `Bruce Willis`,
  `Matthew McConaughey`,
  `Anne Hathaway`,
  `Michael Caine`,
  `Michael J. Fox`,
  `Christopher Lloyd`,
  `Anthony Gonzalez`,
  `Sean Astin`,
  `Tom Hanks`,
  `Tim Robbins`,
  `Morgan Freeman`,
  `Liam Neeson`,
  `Tom Hanks`,
];

const cartCountry = [
  `USA`,
  `New Zealand`,
  `Australia`,
  `Russia`,
  `France`,
  `England`,
];

const cartAgeRating = [
  3,
  7,
  12,
  16,
  18,
];

const generateCardData = () => {
  let id = getRandomNumber(0, cardImages.length - 1);

  return {
    poster: cardImages[id],
    title: cardTitles[id],
    rating: getRandomNumberPoint(4, 10, 1),
    yearCreat: getRandomNumber(1988, 2022),
    duration: `${getRandomNumber(0, 3)}h ${ getNumberWithLeadZero(getRandomNumber(0, 59))}m`,
    genre: getRandomItemArr(cartGenres),
    description: getRandomItemsArray(cardTextSentenses, getRandomNumber(1, 3)),
    comments: getRandomNumber(0, 10),
    fullPoster: cardImages[id],
    originalTitle: cardTitles[id],
    ratingUser: getRandomNumberPoint(4, 10, 1),
    director: cartDirectors[id],
    screenwriters: getRandomItemsArray(cartScreenwriters, getRandomNumber(1, 4)),
    actors: getRandomItemsArray(cartActors, getRandomNumber(1, 4)),
    dateCreat: getRandomNumber(1988, 2022),
    country: getRandomItemArr(cartCountry),
    fullDescription: generateLoremText(getRandomNumber(10, 20)),
    ageRating: getRandomItemArr(cartAgeRating)

  };
};

export {generateCardData};
